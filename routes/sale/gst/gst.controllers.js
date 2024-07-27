const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createGst = async (req, res) => {
  try {
    const createdGst = await prisma.gst.create({
      data: {
        name: req.body.name,
        percentage: parseInt(req.body.percentage)
      },
    });
    res.json({ data: createdGst });
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

const updateGst = async (req, res) => {
  try {
    const updatedGst = await prisma.gst.update({
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
    res.json({ data: updatedGst });
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

const getGsts = async (req, res) => {
  try {
    let status = false;
    if (req.params.status == "active") {
      status = true
    }
    const getGsts = await prisma.gst.findMany({
      where: {
        status: status,
      },
      orderBy: {
        created_at: 'desc',
      }
    });
    res.json( getGsts );
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

const getLatestGst = async (req, res) => {
  try{
    const getGst = await prisma.gst.findMany({
      where: {
        status: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 1
    });
    if(getGst?.[0]){
      res.json(getGst[0]);
    }
    res.json({percentage: 0});
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
}

module.exports = {
  createGst,
  updateGst,
  getGsts,
  getLatestGst
}