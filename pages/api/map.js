import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { latitude, longitude, radius, data } = req.body;

    if (
      !latitude ||
      !latitude.trim() === "" ||
      !longitude ||
      longitude.trim() === "" ||
      !radius ||
      radius.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newData = {
      latitude,
      longitude,
      radius,
      data,
    };

    let client;

    try {
      client = await MongoClient.connect(
        "mongodb+srv://amir:h08M1F5vjLJpafFP@mycluster0.lewjb.mongodb.net/GoogleMap?retryWrites=true&w=majority"
      );
    } catch (error) {
      res
        .status(500)
        .json({ message: "Could not connect to database.", error: { error } });
      return;
    }

    const db = client.db();

    //find one ?
    try {
      db.collection("user-data").findOne(
        {
          latitude: latitude,
          longitude: longitude,
          radius: radius,
        },
        (err, result) => {
          if (result) {
            //find in db
            res
              .status(200)
              .json({ message: "Record find in MongoDB!", results: result });
            return;
          }
          // store in db
          try {
            const Result = db.collection("user-data").insertOne(newData);
            res
              .status(201)
              .json({ message: "Successfully stored data!", results: newData });
          } catch (error) {
            res.status(500).json({ message: "Storing data failed!" });
            client.close();
            return;
          }
        }
      );
    } catch {
      res.status(500).json({ message: "Something was wrong!" });
      client.close();
      return;
    }
  }
}

export default handler;
