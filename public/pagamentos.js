const express = require("express");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN,
});

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { total } = req.body;

    const pagamento = await mercadopago.payment.create({
      transaction_amount: Number(total),
      description: "Pedido Restaurante",
      payment_method_id: "pix",
      payer: { email: "cliente@email.com" },
    });

    res.json({
      qrCode:
        pagamento.body.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (e) {
    res.status(500).json({ erro: "Erro no pagamento" });
  }
});

module.exports = router;
