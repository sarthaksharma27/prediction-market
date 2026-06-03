from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: PostgresDsn
    SUPABASE_PROJECT_URL: str

    model_config = SettingsConfigDict(
        env_file="app/.env",
        env_file_encoding="utf-8"
    )


settings = Settings()