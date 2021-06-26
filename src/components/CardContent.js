import React, { useEffect, useContext } from "react";
import { InshortsContext } from "../Routes";
import "./CardContent.css";
import { PATH, PRODUCT_URL } from "../constants";

const CardContent = () => {
  const { state, dispatch } = useContext(InshortsContext);
  useEffect(() => {
    fetch(`${PRODUCT_URL}${PATH.ARTICLES}`)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);

        dispatch({
          type: "NEWS",
          payload: Array.prototype.reverse.call(result),
        });
      });
  }, []);

  const SingleArticleView = (e) => {
    fetch(`${PRODUCT_URL}${PATH.ARTICLES}${e}`)
      .then((res) => res.json())
      .then((result) => {
        dispatch({
          type: "NEWS",
          payload: [result],
        });
      });
  };
  return (
    <>
      {state &&
        state.result &&
        state.result.reverse().map((e, i) => (
          <div className="cardcontent__card" key={i}>
            <img
              src={`${PRODUCT_URL}${PATH.ARTICLES}${PATH.IMAGE}${e._id}`}
              className="cardcontent__image"
            />
            <div className="cardcontent__holder" key={i}>
              <div style={{ cursor: "pointer" }}>
                <span
                  className="cardcontent__title"
                  onClick={() => SingleArticleView(e._id)}
                >
                  {e.title}
                </span>
                <br />
                <span className="cardcontent__postedby">
                  <a
                    href={e.source}
                    target="__blank"
                    className="cardcontent__source"
                  >
                    <b>short </b>
                  </a>{" "}
                  <span className="cardcontent__postedbyName">
                    {e.postedBy} / {e.updatedAt.split("T")[1].substring(0, 5)}{" "}
                    on {e.updatedAt.split("T")[0]}
                  </span>
                </span>
              </div>
              <div className="cardcontent__body" key={i}>
                <div className="cardcontent__description">{e.description}</div>
                <span className="cardcontent__readmore">
                  read more at{" "}
                  <a
                    href={e.source}
                    target="_blank"
                    className="cardcontent__source"
                  >
                    <b>{e.sourceName}</b>
                  </a>
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CardContent;
