
Set-ExecutionPolicy Unrestricted -Scope Process
.venv\Scripts\Activate.ps1

fastapi dev main.py
uvicorn main:app --host 0.0.0.0 --port 8000 --reload


[text](http://127.0.0.1:8000/docs)


source .venv/Scripts/activate