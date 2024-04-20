DROP TABLE IF EXISTS DonationDetail;

DROP TABLE IF EXISTS OrderDetail;

DROP TABLE IF EXISTS `Order`;

DROP TABLE IF EXISTS Donation;

DROP TABLE IF EXISTS Donor;

DROP TABLE IF EXISTS Item;

DROP TABLE IF EXISTS Employee;

DROP TABLE IF EXISTS Role;

DROP TABLE IF EXISTS Student;

CREATE TABLE
    Student(
        ID int NOT NULL AUTO_INCREMENT,
        FirstName varchar(20) NOT NULL,
        LastName varchar(20) Not Null,
        Address1 Varchar(200) Not Null,
        Address2 Varchar(200),
        Phone Varchar(13) Not Null,
        Email Varchar(40) Not Null,
        City Varchar(20) Not Null,
        State char(2) Not null,
        Zipcode int Not Null,
        Active BIT(1),
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        PRIMARY KEY (ID)
    );

CREATE TABLE
    Role(
        ID int NOT NULL AUTO_INCREMENT,
        Designation Varchar(25) Not Null,
        Active BIT(1),
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        PRIMARY KEY (ID)
    );

CREATE TABLE
    Employee(
        ID int NOT NULL AUTO_INCREMENT,
        ManagerID int,
        RoleID int Not Null,
        FirstName varchar(20) NOT NULL,
        LastName varchar(20) Not Null,
        Address1 Varchar(200) Not Null,
        Address2 Varchar(200),
        Phone Varchar(13) Not Null,
        Email Varchar(40) Not Null,
        City Varchar(20) Not Null,
        Zipcode int Not Null,
        State char(2) Not null,
        Active BIT(1),
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        PRIMARY KEY (ID),
        FOREIGN KEY (RoleID) REFERENCES Role(ID),
        FOREIGN KEY (ManagerID) REFERENCES Employee(ID)
    );

CREATE TABLE
    Donor(
        ID int NOT NULL AUTO_INCREMENT,
        FirstName varchar(20) NOT NULL,
        LastName varchar(20) Not Null,
        Address1 Varchar(200) Not Null,
        Address2 Varchar(200),
        Phone Varchar(13) Not Null,
        Email Varchar(40) Not Null,
        City Varchar(20) Not Null,
        State char(2) Not null,
        Zipcode int Not Null,
        Active BIT(1),
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        CreatedBy int Not Null,
        LastUpdatedBy int Not Null,
        PRIMARY KEY (ID),
        FOREIGN KEY (CreatedBy) REFERENCES Employee(ID),
        FOREIGN KEY (LastUpdatedBy) REFERENCES Employee(ID)
    );

CREATE TABLE
    Item(
        ID int NOT NULL AUTO_INCREMENT,
        Name Varchar(25) Not Null,
        Description Varchar(50) Not Null,
        Active BIT(1),
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        CreatedBy int Not Null,
        LastUpdatedBy int Not Null,
        PRIMARY KEY (ID),
        FOREIGN KEY (CreatedBy) REFERENCES Employee(ID),
        FOREIGN KEY (LastUpdatedBy) REFERENCES Employee(ID)
    );

CREATE TABLE
    Donation(
        ID int NOT NULL AUTO_INCREMENT,
        DonorID int Not Null,
        DonationDate Date Not Null,
        Active BIT(1),
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        PRIMARY KEY (ID),
        FOREIGN KEY (DonorID) REFERENCES Donor(ID)
    );

CREATE TABLE
    `Order` (
        ID int NOT NULL AUTO_INCREMENT,
        StudentID int Not Null,
        OrderDate Date Not Null,
        Status Varchar(15) Not Null,
        CreatedDate Date Not Null,
        LastUpdatedDate Date Not Null,
        LastUpdatedBy int Not Null,
        PRIMARY KEY (ID),
        FOREIGN KEY (StudentID) REFERENCES Student(ID),
        FOREIGN KEY (LastUpdatedBy) REFERENCES Employee(ID),
        CONSTRAINT status_check CHECK (
            Status in (
                'completed',
                'pending',
                'rejected'
            )
        )
    );

CREATE TABLE
    OrderDetail(
        ID int NOT NULL AUTO_INCREMENT,
        ItemID int Not Null,
        OrderID int Not Null,
        QuantityDistributed int Not Null,
        PRIMARY KEY (ID),
        FOREIGN KEY (ItemID) REFERENCES Item(ID),
        FOREIGN KEY (OrderID) REFERENCES `Order`(ID)
    );

CREATE TABLE
    DonationDetail(
        DonationID int Not Null,
        ItemID int Not Null,
        QuantityReceived Int Not Null,
        PRIMARY KEY (DonationID, ItemID),
        FOREIGN KEY (ItemID) REFERENCES Item(ID),
        FOREIGN KEY (DonationID) REFERENCES Donation(ID)
    );

INSERT INTO
    Role (
        Designation,
        Active,
        CreatedDate,
        LastUpdatedDate
    )
VALUES (
        'Manager',
        1,
        '2023-01-01',
        '2023-01-01'
    ), (
        'Staff',
        1,
        '2023-01-01',
        '2023-01-01'
    ), (
        'TeamLead',
        1,
        '2023-01-01',
        '2023-01-01'
    );

INSERT INTO
    Employee (
        ManagerID,
        RoleID,
        FirstName,
        LastName,
        Address1,
        Address2,
        Phone,
        Email,
        City,
        State,
        Zipcode,
        Active,
        CreatedDate,
        LastUpdatedDate
    )
VALUES (
        NULL,
        1,
        'John',
        'Doe',
        '123 Main St',
        NULL,
        '111-222-3333',
        'johndoe@email.com',
        'New York',
        'NY',
        10001,
        1,
        '2023-01-02',
        '2023-01-02'
    ), (
        1,
        2,
        'Jane',
        'Doe',
        '456 Park Ave',
        'Apt 1',
        '333-444-5555',
        'janedoe@email.com',
        'Chicago',
        'IL',
        60605,
        1,
        '2023-01-03',
        '2023-01-03'
    ), (
        1,
        2,
        'Bob',
        'Smith',
        '789 Oak Rd',
        NULL,
        '444-555-6666',
        'bobsmith@email.com',
        'Los Angeles',
        'CA',
        90001,
        1,
        '2023-01-04',
        '2023-01-04'
    ), (
        1,
        2,
        'Sue',
        'Williams',
        '246 Elm St',
        'Unit 5',
        '555-666-7777',
        'suewilliams@email.com',
        'Houston',
        'TX',
        77001,
        1,
        '2023-01-05',
        '2023-01-05'
    ), (
        1,
        2,
        'Mike',
        'Brown',
        '135 Pine Ave',
        NULL,
        '666-777-8888',
        'mikebrown@email.com',
        'Phoenix',
        'TX',
        85001,
        1,
        '2023-01-06',
        '2023-01-06'
    ), (
        1,
        2,
        'Jennifer',
        'Davis',
        '987 Oak Dr',
        'Apt 3',
        '777-888-9999',
        'jenniferdavis@email.com',
        'San Diego',
        'CA',
        92101,
        1,
        '2023-01-07',
        '2023-01-07'
    ), (
        1,
        2,
        'Chris',
        'Miller',
        '246 Pine Rd',
        NULL,
        '888-999-1234',
        'chrismiller@email.com',
        'San Francisco',
        'CA',
        94105,
        1,
        '2023-01-08',
        '2023-01-08'
    ), (
        1,
        2,
        'Lisa',
        'Walker',
        '135 Elm St',
        'Unit 2',
        '999-123-4567',
        'lisawalker@email.com',
        'Seattle',
        'CA',
        98121,
        1,
        '2023-01-09',
        '2023-01-09'
    ), (
        1,
        2,
        'David',
        'Anderson',
        '789 Maple Ave',
        NULL,
        '123-234-3456',
        'davidanderson@email.com',
        'Miami',
        'FL',
        33101,
        1,
        '2023-01-10',
        '2023-01-10'
    ), (
        1,
        2,
        'Michelle',
        'Thomas',
        '246 Oak Ln',
        'Apt 4',
        '234-345-5678',
        'michellethomas@email.com',
        'Boston',
        'MA',
        02108,
        1,
        '2023-01-11',
        '2023-01-11'
    ), (
        1,
        2,
        'Michael',
        'Moore',
        '135 Pine St',
        NULL,
        '345-456-6789',
        'michaelmoore@email.com',
        'Los Angeles',
        'CA',
        90002,
        1,
        '2023-01-12',
        '2023-01-12'
    ), (
        1,
        2,
        'Jessica',
        'Taylor',
        '246 Elm Dr',
        'Unit 6',
        '456-567-7890',
        'jessicataylor@email.com',
        'Houston',
        'TX',
        77004,
        1,
        '2023-01-13',
        '2023-01-13'
    ), (
        1,
        2,
        'William',
        'Jackson',
        '789 Maple Ave',
        NULL,
        '567-678-8901',
        'williamjackson@email.com',
        'Phoenix',
        'TX',
        85004,
        1,
        '2023-01-14',
        '2023-01-14'
    ), (
        1,
        2,
        'Elizabeth',
        'White',
        '123 Oak St',
        'Apt 3',
        '678-789-0123',
        'elizabethwhite@email.com',
        'Philadelphia',
        'PA',
        19104,
        1,
        '2023-01-15',
        '2023-01-15'
    ), (
        1,
        2,
        'Jennifer',
        'Harris',
        '456 Pine Rd',
        NULL,
        '789-890-1234',
        'jenniferharris@email.com',
        'San Diego',
        'CA',
        92104,
        1,
        '2023-01-16',
        '2023-01-16'
    ), (
        1,
        2,
        'James',
        'Martin',
        '789 Elm St',
        'Unit 5',
        '890-901-2345',
        'jamesmartin@email.com',
        'Detroit',
        'MI',
        48203,
        1,
        '2023-01-17',
        '2023-01-17'
    ), (
        1,
        2,
        'Patricia',
        'Thompson',
        '123 Maple Dr',
        NULL,
        '901-012-3456',
        'patrickthompson@email.com',
        'San Francisco',
        'CA',
        94104,
        1,
        '2023-01-18',
        '2023-01-18'
    ), (
        1,
        2,
        'John',
        'Garcia',
        '456 Oak Ln',
        'Apt 2',
        '012-123-4567',
        'johngarcia@email.com',
        'Seattle',
        'CA',
        98122,
        1,
        '2023-01-19',
        '2023-01-19'
    ), (
        1,
        2,
        'Robert',
        'Martinez',
        '789 Elm Ave',
        NULL,
        '123-234-5678',
        'robertmartinez@email.com',
        'Austin',
        'TX',
        73302,
        1,
        '2023-01-20',
        '2023-01-20'
    ), (
        1,
        2,
        'Susan',
        'Robinson',
        '123 Pine St',
        'Unit 1',
        '234-345-6789',
        'susanrobinson@email.com',
        'New York',
        'NY',
        10004,
        1,
        '2023-01-21',
        '2023-01-21'
    ), (
        1,
        2,
        'Karen',
        'Clark',
        '456 Elm St',
        NULL,
        '345-456-7890',
        'karenclark@email.com',
        'Los Angeles',
        'CA',
        90007,
        1,
        '2023-01-22',
        '2023-01-22'
    ), (
        1,
        2,
        'Steven',
        'Rodriguez',
        '789 Maple Dr',
        'Apt 5',
        '456-567-8901',
        'steverodriguez@email.com',
        'Houston',
        'TX',
        77006,
        1,
        '2023-01-23',
        '2023-01-23'
    ), (
        1,
        2,
        'Kenneth',
        'Lewis',
        '123 Oak Ave',
        NULL,
        '567-678-9012',
        'kennethlewis@email.com',
        'Chicago',
        'IL',
        60603,
        1,
        '2023-01-24',
        '2023-01-24'
    ), (
        1,
        2,
        'Jeffrey',
        'Lee',
        '456 Pine St',
        'Unit 2',
        '678-789-0123',
        'jeffreylee@email.com',
        'Phoenix',
        'TX',
        85006,
        1,
        '2023-01-25',
        '2023-01-25'
    ), (
        1,
        2,
        'Kelly',
        'Walker',
        '789 Elm Rd',
        NULL,
        '789-890-1234',
        'kellywalker@email.com',
        'Philadelphia',
        'PA',
        19106,
        1,
        '2023-01-26',
        '2023-01-26'
    ), (
        1,
        2,
        'Scott',
        'Allen',
        '123 Maple Ln',
        'Apt 3',
        '890-901-2345',
        'scottallen@email.com',
        'San Diego',
        'CA',
        92105,
        1,
        '2023-01-27',
        '2023-01-27'
    ), (
        1,
        2,
        'Eric',
        'Young',
        '456 Oak St',
        NULL,
        '901-012-3456',
        'ericyoung@email.com',
        'Detroit',
        'MI',
        48204,
        1,
        '2023-01-28',
        '2023-01-28'
    ), (
        1,
        2,
        'Sharon',
        'King',
        '789 Elm Dr',
        'Unit 1',
        '012-123-4567',
        'sharonking@email.com',
        'San Francisco',
        'CA',
        94105,
        1,
        '2023-01-29',
        '2023-01-29'
    ), (
        1,
        2,
        'Dorothy',
        'Torres',
        '123 Pine Ave',
        'Apt 4',
        '123-234-5678',
        'dorothytorres@email.com',
        'Seattle',
        'CA',
        98123,
        1,
        '2023-01-30',
        '2023-01-30'
    ), (
        1,
        2,
        'Lisa',
        'Reed',
        '456 Oak Rd',
        NULL,
        '234-345-6789',
        'lisareed@email.com',
        'Austin',
        'TX',
        73303,
        1,
        '2023-01-31',
        '2023-01-31'
    );

INSERT INTO
    Student (
        FirstName,
        LastName,
        Address1,
        Address2,
        Phone,
        Email,
        City,
        State,
        Zipcode,
        Active,
        CreatedDate,
        LastUpdatedDate
    )
VALUES (
        'Mark',
        'Smith',
        '789 Elm St',
        NULL,
        '111-222-3333',
        'marks@email.com',
        'Los Angeles',
        'CA',
        90005,
        1,
        '2023-01-12',
        '2023-01-12'
    ), (
        'Mary',
        'Johnson',
        '234 Oak Ave',
        'Apt 5',
        '222-333-4444',
        'maryj@email.com',
        'Houston',
        'TX',
        77002,
        1,
        '2023-01-13',
        '2023-01-13'
    ), (
        'Sara',
        'Williams',
        '135 Pine St',
        'Unit 1',
        '333-444-5555',
        'saraw@email.com',
        'Chicago',
        'IL',
        60601,
        1,
        '2023-01-14',
        '2023-01-14'
    ), (
        'John',
        'Jones',
        '246 Elm Dr',
        NULL,
        '444-555-6666',
        'johnj@email.com',
        'Phoenix',
        'TX',
        85002,
        1,
        '2023-01-15',
        '2023-01-15'
    ), (
        'Emily',
        'Brown',
        '456 Oak Rd',
        'Apt 2',
        '555-666-7777',
        'emilyb@email.com',
        'Philadelphia',
        'PA',
        19102,
        1,
        '2023-01-16',
        '2023-01-16'
    ), (
        'Michael',
        'Davis',
        '246 Pine Ave',
        NULL,
        '666-777-8888',
        'michaeld@email.com',
        'San Diego',
        'CA',
        92109,
        1,
        '2023-01-17',
        '2023-01-17'
    ), (
        'Jessica',
        'Miller',
        '135 Elm St',
        'Unit 3',
        '777-888-9999',
        'jessicam@email.com',
        'Detroit',
        'MI',
        48201,
        1,
        '2023-01-18',
        '2023-01-18'
    ), (
        'Chris',
        'Wilson',
        '789 Maple Ln',
        NULL,
        '888-999-1234',
        'chrisw@email.com',
        'San Francisco',
        'CA',
        94102,
        1,
        '2023-01-19',
        '2023-01-19'
    ), (
        'Amanda',
        'Moore',
        '123 Oak Dr',
        'Apt 1',
        '999-123-4567',
        'amandam@email.com',
        'Austin',
        'TX',
        73301,
        1,
        '2023-01-20',
        '2023-01-20'
    ), (
        'Joseph',
        'Thompson',
        '456 Pine St',
        NULL,
        '123-234-5678',
        'josepht@email.com',
        'New York',
        'NY',
        10003,
        1,
        '2023-01-21',
        '2023-01-21'
    ), (
        'David',
        'Brooks',
        '789 Elm Ave',
        'Unit 2',
        '234-345-6789',
        'davidbrooks@email.com',
        'Los Angeles',
        'CA',
        90006,
        1,
        '2023-01-22',
        '2023-01-22'
    ), (
        'Daniel',
        'Ross',
        '123 Maple St',
        NULL,
        '345-456-7890',
        'danielross@email.com',
        'Houston',
        'TX',
        77005,
        1,
        '2023-01-23',
        '2023-01-23'
    ), (
        'Paul',
        'Murphy',
        '456 Oak Dr',
        'Apt 3',
        '456-567-8901',
        'paulmurphy@email.com',
        'Chicago',
        'IL',
        60602,
        1,
        '2023-01-24',
        '2023-01-24'
    ), (
        'Mark',
        'Cook',
        '789 Pine Ln',
        'Unit 1',
        '567-678-9012',
        'markcook@email.com',
        'Phoenix',
        'TX',
        85005,
        1,
        '2023-01-25',
        '2023-01-25'
    ), (
        'Donald',
        'Bell',
        '123 Elm St',
        NULL,
        '678-789-0123',
        'donaldbell@email.com',
        'Philadelphia',
        'PA',
        19105,
        1,
        '2023-01-26',
        '2023-01-26'
    ), (
        'David',
        'Moore',
        '456 Oak Ave',
        'Apt 2',
        '789-890-1234',
        'davidmoore@email.com',
        'San Diego',
        'CA',
        92106,
        1,
        '2023-01-27',
        '2023-01-27'
    ), (
        'Paul',
        'Taylor',
        '789 Maple St',
        NULL,
        '890-901-2345',
        'paultaylor@email.com',
        'Detroit',
        'MI',
        48205,
        1,
        '2023-01-28',
        '2023-01-28'
    ), (
        'Mark',
        'Anderson',
        '123 Pine Dr',
        'Unit 3',
        '901-012-3456',
        'markanderson@email.com',
        'San Francisco',
        'CA',
        94106,
        1,
        '2023-01-29',
        '2023-01-29'
    ), (
        'Mary',
        'Thomas',
        '456 Elm Ln',
        'Apt 1',
        '012-123-4567',
        'marythomas@email.com',
        'Seattle',
        'CA',
        98124,
        1,
        '2023-01-30',
        '2023-01-30'
    ), (
        'Patricia',
        'Jackson',
        '789 Oak St',
        NULL,
        '123-234-5678',
        'patriciajackson@email.com',
        'Austin',
        'TX',
        73304,
        1,
        '2023-01-31',
        '2023-01-31'
    ), (
        'John',
        'White',
        '123 Maple Ave',
        'Unit 4',
        '234-345-6789',
        'johnwhite@email.com',
        'New York',
        'NY',
        10005,
        1,
        '2023-02-01',
        '2023-02-01'
    ), (
        'James',
        'Harris',
        '456 Pine Ln',
        NULL,
        '345-456-7890',
        'jamesharris@email.com',
        'Los Angeles',
        'CA',
        90008,
        1,
        '2023-02-02',
        '2023-02-02'
    ), (
        'Robert',
        'Martin',
        '789 Elm St',
        'Apt 5',
        '456-567-8901',
        'robertmartin@email.com',
        'Houston',
        'TX',
        77007,
        1,
        '2023-02-03',
        '2023-02-03'
    ), (
        'Michael',
        'Thompson',
        '123 Oak Dr',
        NULL,
        '567-678-9012',
        'michaelthompson@email.com',
        'Chicago',
        'IL',
        60604,
        1,
        '2023-02-04',
        '2023-02-04'
    ), (
        'William',
        'Garcia',
        '456 Maple Rd',
        'Unit 2',
        '678-789-0123',
        'williamgarcia@email.com',
        'Phoenix',
        'TX',
        85007,
        1,
        '2023-02-05',
        '2023-02-05'
    ), (
        'David',
        'Martinez',
        '789 Pine Ave',
        'Apt 3',
        '789-890-1234',
        'davidmartinez@email.com',
        'Philadelphia',
        'PA',
        19107,
        1,
        '2023-02-06',
        '2023-02-06'
    ), (
        'Richard',
        'Robinson',
        '123 Elm St',
        NULL,
        '890-901-2345',
        'richardrobinson@email.com',
        'San Diego',
        'CA',
        92107,
        1,
        '2023-02-07',
        '2023-02-07'
    ), (
        'Charles',
        'Clark',
        '456 Oak Ln',
        'Unit 1',
        '901-012-3456',
        'charlesclark@email.com',
        'Detroit',
        'MI',
        48206,
        1,
        '2023-02-08',
        '2023-02-08'
    ), (
        'Joseph',
        'Rodriguez',
        '789 Maple St',
        'Apt 4',
        '012-123-4567',
        'josephrodriguez@email.com',
        'San Francisco',
        'CA',
        94107,
        1,
        '2023-02-09',
        '2023-02-09'
    ), (
        'Thomas',
        'Lewis',
        '123 Pine Dr',
        NULL,
        '123-234-5678',
        'thomaslewis@email.com',
        'Seattle',
        'CA',
        98125,
        1,
        '2023-02-10',
        '2023-02-10'
    );

INSERT INTO
    Donor (
        FirstName,
        LastName,
        Address1,
        Address2,
        Phone,
        Email,
        City,
        State,
        Zipcode,
        Active,
        CreatedDate,
        LastUpdatedDate,
        CreatedBy,
        LastUpdatedBy
    )
VALUES (
        'David',
        'Lee',
        '135 Pine Ave',
        NULL,
        '111-222-3333',
        'davidl@email.com',
        'Seattle',
        'CA',
        98101,
        1,
        '2023-01-22',
        '2023-01-22',
        2,
        2
    ), (
        'Michelle',
        'Williams',
        '246 Oak Rd',
        'Apt 1',
        '222-333-4444',
        'michellew@email.com',
        'Miami',
        'FL',
        33102,
        1,
        '2023-01-23',
        '2023-01-23',
        2,
        2
    ), (
        'Michael',
        'Jones',
        '789 Elm St',
        NULL,
        '333-444-5555',
        'michaelj@email.com',
        'Boston',
        'MA',
        02109,
        1,
        '2023-01-24',
        '2023-01-24',
        2,
        2
    ), (
        'Lisa',
        'Brown',
        '123 Oak Dr',
        'Unit 2',
        '444-555-6666',
        'lisab@email.com',
        'Houston',
        'TX',
        77003,
        1,
        '2023-01-25',
        '2023-01-25',
        2,
        2
    ), (
        'Robert',
        'Davis',
        '456 Maple Ave',
        NULL,
        '555-666-7777',
        'robertd@email.com',
        'Chicago',
        'IL',
        60610,
        1,
        '2023-01-26',
        '2023-01-26',
        2,
        2
    ), (
        'Susan',
        'Miller',
        '789 Elm Ln',
        'Apt 3',
        '666-777-8888',
        'susanm@email.com',
        'Phoenix',
        'TX',
        85003,
        1,
        '2023-01-27',
        '2023-01-27',
        2,
        2
    ), (
        'William',
        'Wilson',
        '123 Pine Rd',
        NULL,
        '777-888-9999',
        'williamw@email.com',
        'Philadelphia',
        'PA',
        19103,
        1,
        '2023-01-28',
        '2023-01-28',
        2,
        2
    ), (
        'Elizabeth',
        'Moore',
        '456 Oak St',
        'Unit 1',
        '888-999-1234',
        'elizabethm@email.com',
        'San Diego',
        'CA',
        92103,
        1,
        '2023-01-29',
        '2023-01-29',
        2,
        2
    ), (
        'Jennifer',
        'Thompson',
        '789 Maple Dr',
        NULL,
        '999-123-4567',
        'jennifert@email.com',
        'San Francisco',
        'CA',
        94103,
        1,
        '2023-01-30',
        '2023-01-30',
        2,
        2
    ), (
        'James',
        'White',
        '123 Elm Ave',
        'Apt 2',
        '123-234-5678',
        'jamesw@email.com',
        'Detroit',
        'MI',
        48202,
        1,
        '2023-01-31',
        '2023-01-31',
        2,
        2
    ), (
        'John',
        'Harris',
        '456 Pine Ln',
        NULL,
        '234-345-6789',
        'johnh@email.com',
        'Seattle',
        'CA',
        98102,
        1,
        '2023-02-01',
        '2023-02-01',
        2,
        2
    ), (
        'Sarah',
        'Martin',
        '789 Elm St',
        'Apt 5',
        '345-456-7890',
        'sarahm@email.com',
        'Miami',
        'FL',
        33103,
        1,
        '2023-02-02',
        '2023-02-02',
        2,
        2
    ), (
        'Mark',
        'Thompson',
        '123 Oak Dr',
        NULL,
        '456-567-8901',
        'markt@email.com',
        'Boston',
        'MA',
        02110,
        1,
        '2023-02-03',
        '2023-02-03',
        2,
        2
    ), (
        'Mary',
        'Garcia',
        '456 Maple Rd',
        'Unit 2',
        '567-678-9012',
        'maryg@email.com',
        'Houston',
        'TX',
        77004,
        1,
        '2023-02-04',
        '2023-02-04',
        2,
        2
    ), (
        'Patricia',
        'Martinez',
        '789 Pine Ave',
        'Apt 3',
        '678-789-0123',
        'patriciam@email.com',
        'Chicago',
        'IL',
        60611,
        1,
        '2023-02-05',
        '2023-02-05',
        2,
        2
    ), (
        'Charles',
        'Robinson',
        '123 Elm St',
        NULL,
        '789-890-1234',
        'charlesr@email.com',
        'Phoenix',
        'TX',
        85004,
        1,
        '2023-02-06',
        '2023-02-06',
        2,
        2
    ), (
        'Margaret',
        'Clark',
        '456 Oak Ln',
        'Unit 1',
        '890-901-2345',
        'margaretc@email.com',
        'Philadelphia',
        'PA',
        19104,
        1,
        '2023-02-07',
        '2023-02-07',
        2,
        2
    ), (
        'Donald',
        'Rodriguez',
        '789 Maple St',
        'Apt 4',
        '901-012-3456',
        'donaldr@email.com',
        'San Diego',
        'CA',
        92104,
        1,
        '2023-02-08',
        '2023-02-08',
        2,
        2
    ), (
        'Joseph',
        'Lewis',
        '123 Pine Dr',
        NULL,
        '012-123-4567',
        'josephl@email.com',
        'Detroit',
        'MI',
        48203,
        1,
        '2023-02-09',
        '2023-02-09',
        2,
        2
    ), (
        'Thomas',
        'Brooks',
        '456 Elm St',
        'Apt 6',
        '123-234-5678',
        'thomasb@email.com',
        'San Francisco',
        'CA',
        94104,
        1,
        '2023-02-10',
        '2023-02-10',
        2,
        2
    ), (
        'Christopher',
        'Ross',
        '789 Oak Ave',
        NULL,
        '234-345-6789',
        'christopherr@email.com',
        'Seattle',
        'CA',
        98103,
        1,
        '2023-02-11',
        '2023-02-11',
        2,
        2
    ), (
        'Daniel',
        'Murphy',
        '123 Maple St',
        'Unit 3',
        '345-456-7890',
        'danielm@email.com',
        'Miami',
        'FL',
        33104,
        1,
        '2023-02-12',
        '2023-02-12',
        2,
        2
    ), (
        'Paul',
        'Cook',
        '456 Pine Ln',
        'Apt 1',
        '456-567-8901',
        'paulc@email.com',
        'Boston',
        'MA',
        02111,
        1,
        '2023-02-13',
        '2023-02-13',
        2,
        2
    ), (
        'Mark',
        'Bell',
        '789 Elm St',
        NULL,
        '567-678-9012',
        'markb@email.com',
        'Houston',
        'TX',
        77005,
        1,
        '2023-02-14',
        '2023-02-14',
        2,
        2
    ), (
        'Donald',
        'Moore',
        '123 Oak Dr',
        'Unit 4',
        '678-789-0123',
        'donaldmo@email.com',
        'Chicago',
        'IL',
        60612,
        1,
        '2023-02-15',
        '2023-02-15',
        2,
        2
    ), (
        'David',
        'Taylor',
        '456 Maple Rd',
        NULL,
        '789-890-1234',
        'davidt@email.com',
        'Phoenix',
        'TX',
        85005,
        1,
        '2023-02-16',
        '2023-02-16',
        2,
        2
    ), (
        'Paul',
        'Anderson',
        '789 Pine St',
        'Apt 5',
        '890-901-2345',
        'paulanderson@email.com',
        'Philadelphia',
        'PA',
        19105,
        1,
        '2023-02-17',
        '2023-02-17',
        2,
        2
    ), (
        'Mark',
        'Thomas',
        '123 Elm Ave',
        'Unit 2',
        '901-012-3456',
        'markthomas@email.com',
        'San Diego',
        'CA',
        92105,
        1,
        '2023-02-18',
        '2023-02-18',
        2,
        2
    ), (
        'Mary',
        'Jackson',
        '456 Oak Ln',
        NULL,
        '012-123-4567',
        'maryjackson@email.com',
        'Detroit',
        'MI',
        48204,
        1,
        '2023-02-19',
        '2023-02-19',
        2,
        2
    ), (
        'Patricia',
        'White',
        '789 Maple St',
        'Apt 3',
        '123-234-5678',
        'patriciawhite@email.com',
        'San Francisco',
        'CA',
        94105,
        1,
        '2023-02-20',
        '2023-02-20',
        2,
        2
    );

INSERT INTO
    Item (
        Name,
        Description,
        Active,
        CreatedDate,
        LastUpdatedDate,
        CreatedBy,
        LastUpdatedBy
    )
VALUES (
        'Rice-',
        'Basmathi rice, various sizes',
        1,
        '2023-02-01',
        '2023-02-01',
        2,
        2
    ), (
        'Beans',
        'Black beans, various sizes',
        1,
        '2023-02-02',
        '2023-02-02',
        2,
        2
    ), (
        'Lentils',
        'Red lentils, various sizes',
        1,
        '2023-02-03',
        '2023-02-03',
        2,
        2
    ), (
        'Socks',
        'Cotton socks, various sizes',
        1,
        '2023-02-04',
        '2023-02-04',
        2,
        2
    ), (
        'Blanket',
        'Fleece blanket, twin size',
        1,
        '2023-02-05',
        '2023-02-05',
        2,
        2
    ), (
        'Backpack',
        'Canvas backpack, black',
        1,
        '2023-02-06',
        '2023-02-06',
        2,
        2
    ), (
        'Pencil',
        'Number 2 pencils',
        1,
        '2023-02-07',
        '2023-02-07',
        2,
        2
    ), (
        'Eraser',
        'Pink erasers',
        1,
        '2023-02-08',
        '2023-02-08',
        2,
        2
    ), (
        'Notebook',
        'Spiral notebooks, college ruled',
        1,
        '2023-02-09',
        '2023-02-09',
        2,
        2
    ), (
        'Folder',
        'Plastic pocket folders',
        1,
        '2023-02-10',
        '2023-02-10',
        2,
        2
    ), (
        'Toothbrush',
        'Manual toothbrushes, various colors',
        1,
        '2023-02-11',
        '2023-02-11',
        2,
        2
    ), (
        'Toothpaste',
        'Mint toothpaste tubes',
        1,
        '2023-02-12',
        '2023-02-12',
        2,
        2
    ), (
        'Soap',
        'Bar soap, assorted brands',
        1,
        '2023-02-13',
        '2023-02-13',
        2,
        2
    ), (
        'Shampoo',
        'Shampoo bottles, various types',
        1,
        '2023-02-14',
        '2023-02-14',
        2,
        2
    ), (
        'Conditioner',
        'Hair conditioner bottles',
        1,
        '2023-02-15',
        '2023-02-15',
        2,
        2
    ), (
        'Lotion',
        'Body lotion bottles, unscented',
        1,
        '2023-02-16',
        '2023-02-16',
        2,
        2
    ), (
        'Towel',
        'Bath towels, solid colors',
        1,
        '2023-02-17',
        '2023-02-17',
        2,
        2
    ), (
        'Washcloth',
        'Cotton washcloths',
        1,
        '2023-02-18',
        '2023-02-18',
        2,
        2
    ), (
        'Socks',
        'Ankle socks, various sizes',
        1,
        '2023-02-19',
        '2023-02-19',
        2,
        2
    ), (
        'Razor',
        'Men & women razors',
        1,
        '2023-02-20',
        '2023-02-20',
        2,
        2
    ), (
        'Gloves',
        'Winter gloves, various sizes',
        1,
        '2023-02-21',
        '2023-02-21',
        2,
        2
    ), (
        'Bananas',
        'Cavendish bananas',
        1,
        '2023-02-22',
        '2023-02-22',
        2,
        2
    ), (
        'Hat',
        'Winter hats, various styles',
        1,
        '2023-02-23',
        '2023-02-23',
        2,
        2
    ), (
        'Oranges',
        'Navel oranges, various sizes',
        1,
        '2023-02-24',
        '2023-02-24',
        2,
        2
    ), (
        'Carrots',
        'Bag of baby carrots',
        1,
        '2023-02-25',
        '2023-02-25',
        2,
        2
    ), (
        'Oatmeal',
        'Old fashioned oats, various sizes',
        1,
        '2023-02-26',
        '2023-02-26',
        2,
        2
    ), (
        'Grapes',
        'Green seedless grapes',
        1,
        '2023-02-27',
        '2023-02-27',
        2,
        2
    ), (
        'Granola bars',
        'Chewy granola bars',
        1,
        '2023-02-28',
        '2023-02-28',
        2,
        2
    ), (
        'Sanitarynapkins',
        'women',
        1,
        '2023-02-27',
        '2023-02-27',
        2,
        2
    ), (
        'Meat',
        'Beef, Red meat',
        1,
        '2023-02-28',
        '2023-02-28',
        2,
        2
    );

INSERT INTO
    Donation (
        DonorID,
        DonationDate,
        Active,
        CreatedDate,
        LastUpdatedDate
    )
VALUES (
        1,
        '2023-03-01',
        1,
        '2023-03-01',
        '2023-03-01'
    ), (
        2,
        '2023-03-02',
        1,
        '2023-03-02',
        '2023-03-02'
    ), (
        3,
        '2023-03-03',
        1,
        '2023-03-03',
        '2023-03-03'
    ), (
        4,
        '2023-03-04',
        1,
        '2023-03-04',
        '2023-03-04'
    ), (
        5,
        '2023-03-05',
        1,
        '2023-03-05',
        '2023-03-05'
    ), (
        6,
        '2023-03-06',
        1,
        '2023-03-06',
        '2023-03-06'
    ), (
        7,
        '2023-03-07',
        1,
        '2023-03-07',
        '2023-03-07'
    ), (
        8,
        '2023-03-08',
        1,
        '2023-03-08',
        '2023-03-08'
    ), (
        9,
        '2023-03-09',
        1,
        '2023-03-09',
        '2023-03-09'
    ), (
        10,
        '2023-03-10',
        1,
        '2023-03-10',
        '2023-03-10'
    ), (
        11,
        '2023-03-11',
        1,
        '2023-03-11',
        '2023-03-11'
    ), (
        12,
        '2023-03-12',
        1,
        '2023-03-12',
        '2023-03-12'
    ), (
        13,
        '2023-03-13',
        1,
        '2023-03-13',
        '2023-03-13'
    ), (
        14,
        '2023-03-14',
        1,
        '2023-03-14',
        '2023-03-14'
    ), (
        15,
        '2023-03-15',
        1,
        '2023-03-15',
        '2023-03-15'
    ), (
        16,
        '2023-03-16',
        1,
        '2023-03-16',
        '2023-03-16'
    ), (
        17,
        '2023-03-17',
        1,
        '2023-03-17',
        '2023-03-17'
    ), (
        18,
        '2023-03-18',
        1,
        '2023-03-18',
        '2023-03-18'
    ), (
        19,
        '2023-03-19',
        1,
        '2023-03-19',
        '2023-03-19'
    ), (
        20,
        '2023-03-20',
        1,
        '2023-03-20',
        '2023-03-20'
    ), (
        21,
        '2023-03-21',
        1,
        '2023-03-21',
        '2023-03-21'
    ), (
        22,
        '2023-03-22',
        1,
        '2023-03-22',
        '2023-03-22'
    ), (
        23,
        '2023-03-23',
        1,
        '2023-03-23',
        '2023-03-23'
    ), (
        24,
        '2023-03-24',
        1,
        '2023-03-24',
        '2023-03-24'
    ), (
        25,
        '2023-03-25',
        1,
        '2023-03-25',
        '2023-03-25'
    ), (
        26,
        '2023-03-26',
        1,
        '2023-03-26',
        '2023-03-26'
    ), (
        27,
        '2023-03-27',
        1,
        '2023-03-27',
        '2023-03-27'
    ), (
        28,
        '2023-03-28',
        1,
        '2023-03-28',
        '2023-03-28'
    ), (
        29,
        '2023-03-29',
        1,
        '2023-03-29',
        '2023-03-29'
    ), (
        30,
        '2023-03-30',
        1,
        '2023-03-30',
        '2023-03-30'
    );

INSERT INTO
    `Order` (
        StudentID,
        OrderDate,
        Status,
        CreatedDate,
        LastUpdatedDate,
        LastUpdatedBy
    )
VALUES (
        1,
        '2023-04-01',
        'pending',
        '2023-04-01',
        '2023-04-01',
        2
    ), (
        2,
        '2023-04-02',
        'completed',
        '2023-04-02',
        '2023-04-02',
        2
    ), (
        3,
        '2023-04-03',
        'pending',
        '2023-04-03',
        '2023-04-03',
        2
    ), (
        4,
        '2023-04-04',
        'rejected',
        '2023-04-04',
        '2023-04-04',
        2
    ), (
        5,
        '2023-04-05',
        'completed',
        '2023-04-05',
        '2023-04-05',
        2
    ), (
        6,
        '2023-04-06',
        'pending',
        '2023-04-06',
        '2023-04-06',
        2
    ), (
        7,
        '2023-04-07',
        'completed',
        '2023-04-07',
        '2023-04-07',
        2
    ), (
        8,
        '2023-04-08',
        'rejected',
        '2023-04-08',
        '2023-04-08',
        2
    ), (
        9,
        '2023-04-09',
        'pending',
        '2023-04-09',
        '2023-04-09',
        2
    ), (
        10,
        '2023-04-10',
        'completed',
        '2023-04-10',
        '2023-04-10',
        2
    ), (
        11,
        '2023-04-11',
        'pending',
        '2023-04-11',
        '2023-04-11',
        2
    ), (
        12,
        '2023-04-12',
        'rejected',
        '2023-04-12',
        '2023-04-12',
        2
    ), (
        13,
        '2023-04-13',
        'completed',
        '2023-04-13',
        '2023-04-13',
        2
    ), (
        14,
        '2023-04-14',
        'pending',
        '2023-04-14',
        '2023-04-14',
        2
    ), (
        15,
        '2023-04-15',
        'completed',
        '2023-04-15',
        '2023-04-15',
        2
    ), (
        16,
        '2023-04-16',
        'rejected',
        '2023-04-16',
        '2023-04-16',
        2
    ), (
        17,
        '2023-04-17',
        'pending',
        '2023-04-17',
        '2023-04-17',
        2
    ), (
        18,
        '2023-04-18',
        'completed',
        '2023-04-18',
        '2023-04-18',
        2
    ), (
        19,
        '2023-04-19',
        'rejected',
        '2023-04-19',
        '2023-04-19',
        2
    ), (
        20,
        '2023-04-20',
        'pending',
        '2023-04-20',
        '2023-04-20',
        2
    ), (
        21,
        '2023-04-21',
        'completed',
        '2023-04-21',
        '2023-04-21',
        2
    ), (
        22,
        '2023-04-22',
        'rejected',
        '2023-04-22',
        '2023-04-22',
        2
    ), (
        23,
        '2023-04-23',
        'pending',
        '2023-04-23',
        '2023-04-23',
        2
    ), (
        24,
        '2023-04-24',
        'completed',
        '2023-04-24',
        '2023-04-24',
        2
    ), (
        25,
        '2023-04-25',
        'rejected',
        '2023-04-25',
        '2023-04-25',
        2
    ), (
        26,
        '2023-04-26',
        'pending',
        '2023-04-26',
        '2023-04-26',
        2
    ), (
        27,
        '2023-04-27',
        'completed',
        '2023-04-27',
        '2023-04-27',
        2
    ), (
        28,
        '2023-04-28',
        'rejected',
        '2023-04-28',
        '2023-04-28',
        2
    ), (
        29,
        '2023-04-29',
        'pending',
        '2023-04-29',
        '2023-04-29',
        2
    ), (
        30,
        '2023-04-30',
        'completed',
        '2023-04-30',
        '2023-04-30',
        2
    );

INSERT INTO
    OrderDetail (
        ItemID,
        OrderID,
        QuantityDistributed
    )
VALUES (1, 1, 2), (2, 2, 1), (3, 3, 1), (4, 4, 3), (5, 5, 1), (6, 6, 2), (7, 7, 2), (8, 8, 4), (9, 9, 3), (10, 10, 1), (11, 11, 5), (12, 12, 3), (13, 13, 2), (14, 14, 1), (15, 15, 4), (16, 16, 5), (17, 17, 2), (18, 18, 3), (19, 19, 1), (20, 20, 5), (21, 21, 2), (22, 22, 4), (23, 23, 3), (24, 24, 1), (25, 25, 5), (26, 26, 4), (27, 27, 3), (28, 28, 2), (29, 29, 1), (30, 30, 5);

INSERT INTO
    DonationDetail (
        DonationID,
        ItemID,
        QuantityReceived
    )
VALUES (1, 1, 5), (2, 1, 10), (3, 1, 15), (4, 3, 8), (5, 4, 20), (6, 5, 12), (7, 6, 7), (8, 7, 9), (9, 8, 14), (10, 9, 6), (11, 10, 8), (12, 11, 4), (13, 12, 10), (14, 13, 12), (15, 14, 6), (16, 15, 5), (17, 16, 20), (18, 17, 15), (19, 18, 10), (20, 1, 12), (21, 2, 6), (22, 3, 8), (23, 4, 10), (24, 5, 15), (25, 6, 20), (26, 7, 10), (27, 8, 12), (28, 9, 14), (29, 10, 16), (30, 20, 25);