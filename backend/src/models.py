from tortoise.models import Model
from tortoise import fields,Tortoise


class Student(Model):
    """Model for Student"""
    class Meta:
        table = "students"

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=50)
    phone = fields.CharField(max_length=13)
    email = fields.CharField(max_length=50 , unique=True)
    address = fields.CharField(max_length=50)
    active = fields.BooleanField(default=True)
    created_at = fields.DatetimeField(auto_now_add=True)
    password = fields.CharField(max_length=50)
    role = fields.CharField(max_length=50,default="student")

class Employee(Student):
    """Model for Employee"""
    class Meta:
        table = "employees"
    
    manager = fields.ForeignKeyField("models.Employee", null=True)
    role = fields.CharField(max_length=50 , choices=["manager", "employee"])

class Donor(Student):
    """ Model for Donor"""
    class Meta:
        table = "donors"

    role = fields.CharField(max_length=50,default="donor")

class FoodItem(Model):
    """Model for Item"""
    class Meta:
        table = "food_items"

    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=25)
    description = fields.CharField(max_length=50)
    image = fields.CharField(max_length=150)
    quantity = fields.IntField(default=1)
    category = fields.CharField(max_length=20)
    active = fields.BooleanField(default=True)
    create_date = fields.DateField(auto_now_add=True , auto_now=True)
    donor = fields.ForeignKeyField("models.Donor")

class Donation(Model):
    """Model for Donations"""
    class Meta:
        table = "donations"

    id = fields.IntField(pk=True)
    donor = fields.ForeignKeyField("models.Donor")
    donation_date = fields.DateField(auto_new_add=True)
    active = fields.BooleanField(default=True)
    create_date = fields.DateField(auto_now_add=True)
    last_updated_date = fields.DateField(auto_now_add=True)


class OrderItem(Model):
    """Model for order details"""
    class Meta:
        table = "order_items"

    id = fields.IntField(pk=True)
    student = fields.ForeignKeyField("models.Student")
    quantity = fields.IntField(default=1)
    status = fields.CharField(max_length=20 , default="pending")
    item = fields.ForeignKeyField("models.FoodItem")
    created_at = fields.DatetimeField(auto_now_add=True)


    @staticmethod
    async def get_list(student_id:int):
        sql = f"""SELECT 
                oi.id AS order_id,
                DATE_FORMAT(oi.created_at, '%d-%m-%Y') AS order_date,
            	fi.name AS item_name,
                oi.quantity,
                oi.status,
                fi.image AS item_image
            FROM
                order_items oi
                    JOIN
                food_items fi ON fi.id = oi.item_id
            WHERE
                oi.student_id = {student_id};
        """
        connection = Tortoise.get_connection("default")
        result = await connection.execute_query_dict(sql)
        return result
    
    @staticmethod
    async def get_total_list():
        sql = f"""SELECT 
                oi.id AS order_id,
                s.name AS student_name,
                s.phone AS student_phone,
                s.address AS student_address,
                DATE_FORMAT(oi.created_at, '%d-%m-%Y') AS order_date,
            	fi.name AS item_name,
                oi.quantity,
                oi.status,
                fi.image AS item_image
            FROM
                order_items oi
                    JOIN
                food_items fi ON fi.id = oi.item_id
                JOIN students s ON s.id = oi.student_id
            WHERE
                oi.status = 'pending';
        """
        connection = Tortoise.get_connection("default")
        result = await connection.execute_query_dict(sql)
        return result
    

    @staticmethod
    async def get_days(created_at):
        sql = f"""
            SELECT
                DATEDIFF(NOW(), '{created_at}') AS days
        """
        connection = Tortoise.get_connection("default")
        result = await connection.execute_query_dict(sql)
        return result[0]["days"]

class DontationDetail(Model):
    """Model for donation details"""

    class Meta:
        table = "donation_details"

    id = fields.IntField(pk=True)
    donation = fields.ForeignKeyField("models.Donation")
    item = fields.ForeignKeyField("models.FoodItem")
    quantity = fields.IntField()