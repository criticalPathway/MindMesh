const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const transaction = require("../models/Transactions"); //we select the table
const Wallet = require("../models/Wallet"); //we select the table
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz";

const UserTransactions = async (req, res) => {
  console.log(req.body);
  console.log("======================================================");
  const transactiondetails = req.body.Transaction;
  console.log(transactiondetails);
  const authToken = req.body.login;
  const data = jwt.verify(authToken, jwtSecret);
  console.log("data come for buy/sell");
  console.log(data.user.id);

  //------------send transactions-------------//

  //--------------------get balance to change wallet money-------------------//

  let amount = 0;
  let invested = 0;
  await Wallet.find({ UserId: data.user.id }).then(async (data) => {
    console.log(data);
    invested = data[0].Invested;
    amount = data[0].Amount;
    console.log(amount);
  });

  if (amount >= req.body.Amount) {
    await Wallet.findOneAndUpdate(
      { UserId: data.user.id },
      {
        Invested: Number(invested) + Number(req.body.Amount),
        Amount: Number(amount) - Number(req.body.Amount),
      }
    ).then(async (data) => {
      console.log("balance updated");
      console.log("value after brought");
      console.log(Number(amount) - Number(req.body.Amount));
      res.send("YES");
    });

    const transactiondata = await transaction.find({ UserId: data.user.id });
    if (transactiondata.length !== 0) {
      await transaction
        .findOneAndUpdate(
          { UserId: data.user.id },
          {
            Transaction: transactiondetails,
          }
        )
        .then(async (data) => {
          console.log("transaction added");
        });
    } else {
      await transaction
        .create({
          UserId: data.user.id,
          Transaction: transactiondetails,
        })
        .then(console.log("333333333333333333333###########################"));
    }
  } else {
    res.send("NO");
  }

  // res.send(data);
  // await Transaction.findOneAndUpdate(
  //   { email: req.body.email },
  //   {
  //     name: req.body.name,
  //     description: req.body.description,
  //   }
  // )
  //   .then(async(data) => {
  //     console.log("updated");
  //     console.log(data);
  //   })
  //   .catch();
};

module.exports = { UserTransactions };
