-- Set up any testing data to be loaded here

-- Basic User
-- Password is: word
INSERT INTO 
    USERS
        (EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, ROLE, ADDRESSLINEONE,
            ADDRESSLINETWO, CITY, STATE, ZIP)
    VALUES
        ('testing@testing.com', '$2b$05$Nj2S7FU1jaPxcJj5bNMHM.iz6LNk67KwTLmEbnFl9R5ywDoZCZqQi', 'Testing', 'User', 'USER', 
            '321 main st', 'apt b', 'city1', 'state1', '12345');


-- Admin User
-- Password is: word
INSERT INTO 
    USERS
        (EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, ROLE)
    VALUES
        ('admin@testing.com', '$2b$05$Nj2S7FU1jaPxcJj5bNMHM.iz6LNk67KwTLmEbnFl9R5ywDoZCZqQi', 'Admin', 'User', 'ADMIN');

