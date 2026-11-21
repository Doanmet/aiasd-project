"""Small SQLite-backed persistence for application records."""

import json
import os
import sqlite3
from contextlib import closing
from pathlib import Path
from typing import Any


def _database_path() -> Path:
    configured = os.getenv("WIKICAMPUS_DATABASE")
    if not configured:
        return Path(__file__).with_name("wikicampus.sqlite3")
    path = Path(configured)
    return path if path.is_absolute() else Path(__file__).resolve().parent.parent / path


def _connect() -> sqlite3.Connection:
    path = _database_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path, timeout=10)
    connection.execute(
        "CREATE TABLE IF NOT EXISTS app_state (name TEXT PRIMARY KEY, value TEXT NOT NULL)"
    )
    connection.execute(
        """CREATE TABLE IF NOT EXISTS chat_usage (
            user_id TEXT NOT NULL,
            usage_day TEXT NOT NULL,
            message_count INTEGER NOT NULL,
            PRIMARY KEY (user_id, usage_day)
        )"""
    )
    connection.commit()
    return connection


def load_state(name: str, default: Any) -> Any:
    with closing(_connect()) as connection:
        row = connection.execute("SELECT value FROM app_state WHERE name = ?", (name,)).fetchone()
    return json.loads(row[0]) if row else default


def save_state(name: str, value: Any) -> None:
    encoded = json.dumps(value, ensure_ascii=False)
    with closing(_connect()) as connection, connection:
        connection.execute(
            "INSERT INTO app_state(name, value) VALUES (?, ?) "
            "ON CONFLICT(name) DO UPDATE SET value = excluded.value",
            (name, encoded),
        )


def reserve_chat_message(user_id: str, usage_day: str, daily_limit: int) -> bool:
    with closing(_connect()) as connection, connection:
        cursor = connection.execute(
            """INSERT INTO chat_usage(user_id, usage_day, message_count)
            VALUES (?, ?, 1)
            ON CONFLICT(user_id, usage_day) DO UPDATE
            SET message_count = message_count + 1
            WHERE message_count < ?""",
            (user_id.lower(), usage_day, daily_limit),
        )
        return cursor.rowcount == 1
