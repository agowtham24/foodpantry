from fastapi import FastAPI,Response,status,File,UploadFile,Form
from fastapi.staticfiles import StaticFiles
import uvicorn
from tortoise.contrib.fastapi import register_tortoise
from dto import *
import os
from models import *
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

# app config
PORT = 8000
HOST = '0.0.0.0'
DB_URL = 'mysql://root:root@localhost:3306/food_pantry' # database url

images_path = os.path.join(os.getcwd() , "static")
if not os.path.exists(images_path):
    os.mkdir(images_path)

app = FastAPI() # create an instance of the FastAPI class
app.add_middleware( # add 
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
app.mount("/static", StaticFiles(directory=images_path), name="static")

register_tortoise(
    app,
    db_url=DB_URL,
    modules={'models': ['models']},
    generate_schemas=False,
    add_exception_handlers=True
)

@app.get("/")
async def index():
    return {"msg" : "Welcome to the api of the food pantry system"}


"""----------------------Employees----------------------"""
# create a employee
@app.post("/employees")
async def student_login(employeeDto:EmployeeDto , response:Response):
    manager = await Employee.get_or_none(id=employeeDto.manager_id)
    employee = await Employee.get_or_none(email=employeeDto.email)
    if employee is not None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : f'Employee with email {employeeDto.email} already exists'}
    await Employee.create(**employeeDto.model_dump() , manager= manager)
    return {"msg" : "Employee Created Successfully"}


@app.post("/employees/login")
async def employee_login(loginDto:LoginDto , response:Response):
    employee = await Employee.get_or_none(email=loginDto.email)
    if employee is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : f"Employee with email {loginDto.email} not found"}
    if employee.password != loginDto.password:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : "Invalid Password"}
    if loginDto.role != employee.role:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : "Invalid Role"}
    return employee
    

@app.put("/employees/{id}")
async def update_employee(id:int , employee:EmployeeDto):
    manager = await Employee.get_or_none(id=employee.manager_id)
    await Employee.filter(id=id).update(**employee.model_dump() , manager= manager)
    return {"msg" : "Employee Updated Successfully"}

@app.get("/employees/{id}")
async def get_employee(id:int):
    employee = await Employee.get_or_none(id=id)
    if employee is None:
        return {"msg" : f'Employee with id {id} not found'}
    return employee

@app.get("/employees")
async def get_employees():
    # custom query
    employees = await Employee.filter(role="employee").all()
    return employees

@app.delete("/employees/{id}")
async def delete_employee(id:int):
    await Employee.filter(id=id).delete()
    return {"msg" : "Employee Deleted Successfully"}


"""----------------------End Employees----------------------"""

"""----------------------Donors----------------------"""

@app.post("/donors")
async def add_donor(donorDto:DonorDto , response:Response):
    donor = await Donor.get_or_none(email=donorDto.email)
    if donor is not None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : f'Donor with email {donorDto.email} already exists'}
    await Donor.create(**donorDto.model_dump())
    return {"msg" : "Donor Created Successfully"}

@app.put("/donors/{id}")
async def update_donor(id:int , donor:DonorDto):
    await Donor.filter(id=id).update(**donor.model_dump())
    return {"msg" : "Donor Updated Successfully"}

@app.get("/donors/{id}")
async def get_donor(id:int):
    donor = await Donor.get_or_none(id=id)
    if donor is None:
        return {"msg" : f'Donor with id {id} not found'}
    return donor

@app.get("/donors")
async def get_donors():
    donors = await Donor.all()
    return donors

@app.delete("/donors/{id}")
async def delete_donor(id:int):
    await Donor.filter(id=id).delete()
    return {"msg" : "Donor Deleted Successfully"}

@app.post("/donors/login")
async def donor_login(loginDto:DonorLoginDto , respnse:Response):
    donor = await Donor.get_or_none(email=loginDto.email)
    if donor is None:
        respnse.status_code = status.HTTP_404_NOT_FOUND
        return {"msg" : f'Donor with email {loginDto.email} not found'}
    if donor.password != loginDto.password:
        respnse.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : "Invalid Password"}
    return donor


"""----------------------End Donors----------------------"""

"""----------------------Items----------------------"""


@app.get("/items/filter")
async def get_item(donor_id:int):
    items = await FoodItem.filter(donor_id=donor_id).all()
    return items

@app.get("/items/distinct")
async def get_item(column:str):
    items = await FoodItem.all().distinct().values(column)
    return items

@app.post("/items")
async def add_item(name:Annotated[str,Form()],description:Annotated[str,Form()], category:Annotated[str,Form()],quantity:Annotated[int,Form()],donor_id:Annotated[int,Form()],response:Response, image:UploadFile = File(...)):
    to_save_path = os.path.join(images_path , image.filename)
    try:
        donor = await Donor.get_or_none(id=donor_id)
        if donor is None:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"msg" : f'Donor with id {donor_id} not found'}
        with open(to_save_path , "wb") as buffer:
            buffer.write(image.file.read())
        path = f'http://localhost:8000/static/{image.filename}'
        item = ItemDto(name=name,description=description,category=category,quantity=quantity,donor_id=donor_id)
        await FoodItem.create(**item.model_dump() , image=path , donor=donor , create_date = datetime.now())
        return {"msg" : "Food Item Addded Successfully"}
    except Exception as e:
        os.remove(to_save_path)
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : str(e)}

@app.put("/items/{id}")
async def update_item(id:int , item:ItemDto):
    await FoodItem.filter(id=id).update(**item.model_dump())
    return {"msg" : "Item Updated Successfully"}

@app.get("/items/{id}")
async def get_item(id:int):
    item = await FoodItem.get_or_none(id=id)
    if item is None:
        return {"msg" : f'Item with id {id} not found'}
    return item

@app.get("/items")
async def get_items():
    items = await FoodItem.all()
    return items

@app.delete("/items/{id}")
async def delete_item(id:int):
    await FoodItem.filter(id=id).delete()
    return {"msg" : "Item Deleted Successfully"}


"""----------------------End Items----------------------"""

"""----------------------Orders----------------------"""

@app.post("/orders")
async def add_order(order:OrderDto , response:Response):
    student = await Student.get_or_none(id=order.student_id)
    if student is None:
        return {"msg" : f'Student with id {order.student_id} not found'}
    
    # get the last order id with the student id
    last_order = await OrderItem.filter(student_id=order.student_id).order_by("-created_at").first()

    if last_order is not None:
        # get me number of days between last order and current order
        days = await OrderItem.get_days(last_order.created_at)
        if days < 7:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"msg" : "You can only order once in a week"}

    items = []
    for item in order.items:
        food_item = await FoodItem.get_or_none(id=item.id)
        if food_item is None:
            return {"msg" : f'Item with id {item.id} not found'}
        items.append(OrderItem(student=student , item=food_item , quantity=item.quantity , status= order.status))
        if food_item.quantity < item.quantity:
            return {"msg" : f'Item with id {item.id} has only {food_item.quantity} quantity left'}
        await FoodItem.filter(id=item.id).update(quantity=food_item.quantity - item.quantity)
    await OrderItem.bulk_create(items)
    return {"msg" : "Order Created Successfully"}


@app.patch("/orders/{id}/status/change")
async def get_orders(id:int , response:Response):
    # execute raw query using tortoise
    order = await OrderItem.get_or_none(id=id)
    if order is None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : f'Order with id {id} not found'}
    order.status = "completed"
    await order.save()
    return {"msg" : "Order Status Changed Successfully"}

@app.get("/orders")
async def get_orders(student_id:int):
    # execute raw query using tortoise
    orders = await OrderItem.get_list(student_id = student_id)
    return orders

@app.get("/orders/total")
async def get_orders():
    # execute raw query using tortoise
    orders = await OrderItem.get_total_list()
    return orders

"""----------------------End Orders----------------------"""

"""----------------------Students----------------------"""

@app.post("/students")
async def add_student(studentDto:StudentDto , response:Response):
    student = await Student.get_or_none(email=studentDto.email)
    if student is not None:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : f'Student with email {studentDto.email} already exists'}
    await Student.create(**studentDto.model_dump())
    return {"msg" : "Student Created Successfully"}

@app.put("/students/{id}")
async def update_student(id:int , student:StudentDto):
    await Student.filter(id=id).update(**student.model_dump())
    return {"msg" : "Student Updated Successfully"}


@app.get("/students/{id}")
async def get_student(id:int):
    student = await Student.get_or_none(id=id)
    if student is None:
        return {"msg" : f'Student with id {id} not found'}
    return student


@app.get("/students")
async def get_students():
    students = await Student.all()
    return students

@app.delete("/students/{id}")  
async def delete_student(id:int):
    await Student.filter(id=id).delete()
    return {"msg" : "Student Deleted Successfully"}

@app.post("/students/login")
async def student_login(loginDto:LoginDto , response:Response):
    student = await Student.get_or_none(email=loginDto.email)
    if student is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"msg" : f"student with email {loginDto.email} not found"}
    if student.password != loginDto.password:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : "Invalid Password"}
    if loginDto.role != student.role:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"msg" : "Invalid Role"}
    return student


"""----------------------End Students----------------------"""


if __name__ == '__main__':
    uvicorn.run("app:app", host=HOST, port=PORT , reload=True)