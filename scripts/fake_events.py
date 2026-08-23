import requests,random,time
while True:
    p={'object_class':random.choice(['person','cow']),'confidence':round(random.uniform(.6,.99),2),'zone':random.choice(['north-east','south-west'])}
    requests.post('http://127.0.0.1:8000/event',json=p,timeout=2); print(p); time.sleep(3)
