import { FC } from "react";

import TMDbLogo from "../graphic/NOT-UNDER-OPEN-LICENSE/tmdb-logo.svg";
import classes from "./Footer.module.css";

const Footer: FC = () => {
  return (
    <div className={`flex container ${classes.footer}`}>
      <img alt="TMDb logo" src={TMDbLogo} className={classes.tmdbLogo} />
      <div>This product uses the TMDb API but is not endorsed or certified by TMDb.</div>
    </div>
  );
};

export default Footer;
