from pydantic import BaseModel
from datetime import datetime
from typing import List

class StudentDto(BaseModel):
    name: str
    phone : str
    email : str
    address : str
    password : str

class EmployeeDto(StudentDto):
    manager_id: int
    role:str = "employee" or "manager"

class ItemDto(BaseModel):
    name: str
    description:str
    category:str
    quantity:int

class DonorDto(StudentDto):
    role:str = "donor"


class CartItem(BaseModel):
    id:int
    quantity:int

class OrderDto(BaseModel):
    student_id:int
    items:List[CartItem]
    status : str = "pending"

class DonationDetailDto(BaseModel):
    donor_id:int
    item_id:int
    quantity:int


class LoginDto(BaseModel):
    email:str
    password:str
    role:str = "student" or "manager"

class DonorLoginDto(BaseModel):
    email:str
    password:str
    role:str = "donor"