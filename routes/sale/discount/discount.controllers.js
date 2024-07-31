const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createDiscount = async (req, res) => {
  try {
    const createddiscount = await prisma.discount.create({
      data: {
        name: req.body.name,
        percentage: parseInt(req.body.percentage)
      },
    });
    res.json({ data: createddiscount });
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

const updateDiscount = async (req, res) => {
  try {
    const updateddiscount = await prisma.discount.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        percentage: parseInt(req.body.percentage),
        status: req.body.status,
        updated_at: new Date()
      },
    });
    res.json({ data: updateddiscount });
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

const getDiscounts = async (req, res) => {
  try {
    let status = false;
    if (req.params.status == "active") {
      status = true
    }
    const getdiscounts = await prisma.discount.findMany({
      where: {
        status: status,
      },
      orderBy: {
        created_at: 'desc',
      }
    });
    res.json( getdiscounts );
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

const getLatestDiscount = async (req, res) => {
  try{
    const getDiscount = await prisma.discount.findMany({
      where: {
        status: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 1
    });
    if(getDiscount?.[0]){
      return res.json(getDiscount[0]);
    }
    res.json({percentage: 0});
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

module.exports = {
  createDiscount,
  updateDiscount,
  getDiscounts,
  getLatestDiscount
}