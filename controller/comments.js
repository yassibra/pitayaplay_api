import {
  ErrorCustomResponse,
  SuccessCustomResponse,
} from "../lib/customResponse";
import Comment from "../model/comment";
import Game from "../model/game";

export function getCommentsByGame(req, res) {
  const { gameId } = req.params;

  if (!Game.isExist(gameId)) {
    res
      .status(404)
      .send(
        new ErrorCustomResponse(
          404,
          `Error get all comments by game - gameId ${gameId} doesn't exist`
        )
      );
    return;
  }

  res.send(
    new SuccessCustomResponse(
      200,
      "Comments list received.",
      Comment.allByGame(gameId)
    )
  );
}

export function putComment(req, res) {
  const { gameId } = req.params;

  if (!Game.isExist(gameId)) {
    res
      .status(404)
      .send(
        new ErrorCustomResponse(
          404,
          `Error get all comments by game - gameId ${gameId} doesn't exist`
        )
      );
    return;
  }

  //TODO update babel config to allow spread operator
  const commentCreated = Comment.create(Object.assign(req.body, { gameId }));
  res.send(new SuccessCustomResponse(200, "Comment created.", commentCreated));
}
