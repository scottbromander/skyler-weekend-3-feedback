CREATE TABLE list
(
    id SERIAL PRIMARY KEY,
    task  varchar(250) NOT NULL,
    task_completed varchar (25),
    date_completed date
);

INSERT INTO "list"
    ("task", "task_completed")
VALUES
    ('Go to the gym', 'Yes');
    
    INSERT INTO "list"
    ("task", "task_completed")
VALUES
    ('Cook dinner', 'No');
    
    INSERT INTO "list"
    ("task", "task_completed")
VALUES
    ('Feed the pets', 'No');
    
    INSERT INTO "list"
    ("task", "task_completed")
VALUES
    ('Mow the lawn', 'Yes');
    
    INSERT INTO "list"
    ("task", "task_completed")
VALUES
    ('Fix car AC', 'No');