CREATE TABLE IF NOT EXISTS USERS (
    ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    NAME VARCHAR(50),
    PRONOUNS VARCHAR(15), 
    AUTH_TYPE AUTH_STRATEGY,
    PASSWORD CHAR(60),
    PROFILE UUID   -- ?? I think we just get profile info from user
);