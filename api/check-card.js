const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { bankName, accountNumber } = req.body;

    // Read the data from the file
    try {
      const data = await fs.promises.readFile(
        path.join(__dirname, "../data.json"),
        "utf8"
      );
      const customers = JSON.parse(data);

      const customer = customers.find(
        (item) =>
          item.bank_name === bankName && item.account_number === accountNumber
      );

      if (customer) {
        res
          .status(200)
          .json({ success: true, cardholder_name: customer.cardholder_name });
      } else {
        res
          .status(404)
          .json({
            success: false,
            message: "Không tìm thấy thông tin hợp lệ.",
          });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Có lỗi khi đọc dữ liệu." });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
};
