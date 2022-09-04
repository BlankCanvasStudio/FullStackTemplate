# This file will populate the database with the init / testing db
CREATE_USERS="""
INSERT INTO USERS (NAME, PRONOUNS)
VALUES
    ('someyou', 'usedto\know'),
    ('another', 'shitty/joke');
"""