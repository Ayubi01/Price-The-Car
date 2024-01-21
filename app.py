from flask import Flask,render_template,request,redirect
from flask_cors import CORS,cross_origin
import pickle
import pandas as pd
import numpy as np
import datetime 

app=Flask(__name__)
cors=CORS(app)
model=pickle.load(open('LinearRegression.pkl','rb'))
car=pd.read_csv('CleanedCar.csv')

@app.route('/',methods=['GET','POST'])
def index():
    companies=sorted(car['company'].unique())
    car_models=sorted(car['name'].unique())
    
    current_year = datetime.datetime.now().year
    year = list(range(current_year, current_year - 28, -1))

    fuel_type=car['fuel_type'].unique()

    companies.insert(0,'Select Company')
    return render_template('n_index.html',companies=companies, car_models=car_models, years=year,fuel_types=fuel_type)


@app.route('/predict',methods=['POST'])
@cross_origin()
def predict():

    company=request.form.get('company')

    car_model=request.form.get('car_models')
    year=int(request.form.get('year'))
    fuel_type=request.form.get('fuel_type')
    kms_driven=int(request.form.get('kms_driven'))

    prediction=model.predict(pd.DataFrame([[car_model,company,year,kms_driven,fuel_type]],columns=['name','company','year','kms_driven','fuel_type']))
    
    print(prediction)

    return str(np.round(prediction[0],2))



if __name__=='__main__':
    app.run()