"""Lets `pytest` find the server package and keeps login tests out of real email."""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))


@pytest.fixture(autouse=True)
def use_test_code_file(monkeypatch: pytest.MonkeyPatch, tmp_path: Path) -> None:
    """Make the course login write test codes to a temporary file, not send email."""
    monkeypatch.setenv("AIASD_CODE_FILE", str(tmp_path / "login_code.txt"))
