from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime
import sqlite3
app=FastAPI(title='AEGISNOVA API')
class Event(BaseModel):
    object_class:str
    confidence:float
    zone:str='zone-1'
@app.get('/health')
def health(): return {'status':'ok'}
@app.post('/event')
def event(e:Event):
    c=sqlite3.connect('database.db'); c.execute('CREATE TABLE IF NOT EXISTS events(id INTEGER PRIMARY KEY,timestamp TEXT,object_class TEXT,confidence REAL,zone TEXT)')
    c.execute('INSERT INTO events(timestamp,object_class,confidence,zone) VALUES(?,?,?,?)',(datetime.now().isoformat(),e.object_class,e.confidence,e.zone)); c.commit(); c.close()
    return {'status':'logged'}
