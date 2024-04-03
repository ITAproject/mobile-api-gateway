const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const app = express();
const router = express.Router();

const packageDefinition = protoLoader.loadSync(
    'C:/Users/jerne/WebstormProjects/web-api-gateway/grpc/discount.proto',
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    }
);

const discount_proto = grpc.loadPackageDefinition(packageDefinition);
const client = new discount_proto.DiscountService('localhost:9000', grpc.credentials.createInsecure());

router.get('/:productId', (req, res) => {
    const productId = req.params.productId;
    client.GetDiscount({productId}, (err, response) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json({discount: response.discount, productId: response.productId});
        }
    });
});

module.exports = router;