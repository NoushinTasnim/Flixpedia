import User from "../models/user.model.js";

export async function saveMovie(req, res){
  const {id, poster_path} = req.body;
        try{
            console.log(id);
            await User.findOneAndUpdate(
                {
                  _id: req.user._id,
                  'savedMovie.id': { $ne: id }  // Ensure there's no existing movie with the same id
                },
                {
                  $addToSet: {
                    savedMovie: {
                      id: id,
                      poster_path: poster_path,
                      createdAt: new Date()
                    }
                  }
                },
                { new: true }  // Return the updated document
              );
              

            res.json({
                success: true,
                message: "Saved",
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
}

export async function saveSeries(req, res){
    const {id, poster_path} = req.body;
        try{
            console.log(id);
            await User.findOneAndUpdate(
                {
                  _id: req.user._id,
                  'savedSeries.id': { $ne: id }  // Ensure there's no existing movseriesie with the same id
                },
                {
                  $addToSet: {
                    savedSeries: {
                      id: id,
                      poster_path: poster_path,
                      createdAt: new Date()
                    }
                  }
                },
                { new: true }  // Return the updated document
              );
              

            res.json({
                success: true,
                message: "Saved",
            })
        }
        catch(e){
            res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
}

export async function getSavedMovies(req, res) {
  try {
    // Find the user and retrieve only the savedMovie field
    const user = await User.findById(req.user._id).select('savedMovie');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      savedMovies: user.savedMovie  // Return the saved movies
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export async function getSavedSeries(req, res) {
  try {
    // Find the user and retrieve only the savedMovie field
    const user = await User.findById(req.user._id).select('savedSeries');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      savedSeries: user.savedSeries  // Return the saved Series
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export async function deleteSavedMovie(req, res) {
  const movieId = req.params.id;
  console.log(movieId)

  try {
    // Find the user and remove the movie with the given id from the savedMovie array
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedMovie: { id: +movieId } } }, // Remove the movie with the matching id
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "Movie deleted successfully",
      savedMovies: user.savedMovie  // Return the updated list of saved movies
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

export async function deleteSavedSeries(req, res) {
  const seriesId = req.params.id;
  console.log(seriesId)

  try {
    // Find the user and remove the movie with the given id from the savedMovie array
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedSeries: { id: +seriesId } } }, // Remove the movie with the matching id
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "Movie deleted successfully",
      savedSeries: user.savedSeries  // Return the updated list of saved movies
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}
