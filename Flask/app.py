from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api, Resource, fields
from flask_cors import CORS
from alarm import check_stock
import time
app = Flask(__name__)
CORS(app)
api = Api(app, version='1.0', title='API 문서', description='Swagger 문서', doc="/api-docs")
api = api.namespace('autostock', description='조회 API')
time.sleep(10)
# MySQL 데이터베이스 설정
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://autostock:1234@localhost:3306/autostock'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 모델 정의
class Stock(db.Model):
    id = db.Column(db.String(6), primary_key=True)  # 종목코드
    name = db.Column(db.String(20), nullable=False)  # 종목명
    first_buy = db.Column(db.Integer, nullable=False)  # 매수가 (2단계)
    second_buy = db.Column(db.Integer, nullable=False)
    first_sell = db.Column(db.Integer, nullable=False)  # 매도가 (5단계)
    second_sell = db.Column(db.Integer, nullable=False)
    third_sell = db.Column(db.Integer, nullable=False)
    fourth_sell = db.Column(db.Integer, nullable=False)
    fifth_sell = db.Column(db.Integer, nullable=False)
    must_sell = db.Column(db.Integer, nullable=False)  # 손절가

    def to_dict(self):
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}

# 데이터베이스 초기화
@app.before_request
def create_tables():
    db.create_all()

# Swagger 모델 정의 (입력 데이터 형식)
stock_model = api.model('Stock', {
    'id': fields.String(required=True, description='종목코드'),
    'name': fields.String(required=True, description='종목명'),
    'first_buy': fields.Integer(required=True, description='첫 번째 매수 가격'),
    'second_buy': fields.Integer(required=True, description='두 번째 매수 가격'),
    'first_sell': fields.Integer(required=True, description='첫 번째 매도 가격'),
    'second_sell': fields.Integer(required=True, description='두 번째 매도 가격'),
    'third_sell': fields.Integer(required=True, description='세 번째 매도 가격'),
    'fourth_sell': fields.Integer(required=True, description='네 번째 매도 가격'),
    'fifth_sell': fields.Integer(required=True, description='다섯 번째 매도 가격'),
    'must_sell': fields.Integer(required=True, description='손절가')
})

# CREATE
@api.route('/stock')
class StockCreate(Resource):
    @api.expect(stock_model)  # Swagger UI에서 입력 양식 표시
    def post(self):
        data = request.get_json()
        stock = Stock(**data)
        db.session.add(stock)
        db.session.commit()
        return make_response(jsonify(stock.to_dict()), 201)

# READ
@api.route('/stocks')
class StockList(Resource):
    def get(self):
        stocks = Stock.query.all()
        return make_response(jsonify([stock.to_dict() for stock in stocks]))

@api.route('/stocks/<string:stock_id>')
class StockDetail(Resource):
    def get(self, stock_id):
        stock = Stock.query.get_or_404(stock_id)
        return make_response(jsonify(stock.to_dict()))

    @api.expect(stock_model)  # Swagger UI에서 입력 양식 표시
    def put(self, stock_id):
        stock = Stock.query.get_or_404(stock_id)
        data = request.get_json()
        for column in Stock.__table__.columns:
            field = column.name
            if field in data:
                setattr(stock, field, data[field])
        db.session.commit()
        return make_response(jsonify(stock.to_dict()))

    def delete(self, stock_id):
        stock = Stock.query.get_or_404(stock_id)
        db.session.delete(stock)
        db.session.commit()
        return make_response(jsonify({"message": "stock deleted"}), 200)

# 알리미 기능
@api.route('/stocks/alarm')
class StockAlarm(Resource):
    def get(self):
        stocks = Stock.query.all()

        resp = {}
        
        for stock in stocks:
            result = check_stock(stock)
            resp.update(result)
            time.sleep(0.5)
        
        return make_response(jsonify(resp), 200)
        

        
            
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
