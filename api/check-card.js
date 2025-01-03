const fs = require("fs");
const path = require("path");

// Đọc tệp JSON chứa thông tin khách hàng
const dataFilePath = path.join(__dirname, "../data/data.json");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { bankName, accountNumber } = req.body;

    // Đọc dữ liệu từ tệp JSON
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Lỗi khi đọc dữ liệu." });
      }

      const customers = JSON.parse(data); // Chuyển dữ liệu JSON thành object

      // Tìm khách hàng theo tên ngân hàng và số tài khoản
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
    });
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
};
