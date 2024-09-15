const db = require("../models");
const tasks = db.tasks;

// exports.getBalanceByWalletId = async (walletId) => {
//   const data = await transactions.findOne({
//     where: { userWalletId: walletId },
//     order: [["createdAt", "DESC"]],
//     attributes: ["balance", "createdAt"],
//     raw: true,
//   });
//   return data?.balance
//     ? { balance: Number(data.balance), createdAt: data.createdAt }
//     : { balance: 0, createdAt: null };
// };

exports.getTasks = async (userId, limit = 0, offset = 10, sort="createdAt", order="DESC" ) => {
  const transactionCount  = await tasks.count({
     where: { userUserId: userId },
  })
  const transactionList = await tasks.findAll({
    where: { userUserId: userId },
    order: [[sort, order]],
    offset,
    limit,
  });
  const list = transactionList.map((transaction) => {
    const type = Number(transaction.dataValues.amount)>=0? "CREDIT":"DEBIT";
    return {...transaction.dataValues, type}
  });
  return {list, totalCount: transactionCount};
};
