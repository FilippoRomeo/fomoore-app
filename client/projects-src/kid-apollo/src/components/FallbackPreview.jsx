import React, { Suspense, useCallback, useState } from "react";
import { LINK_TARGETS } from "../data/linkTargets.js";
import { ROCKET_PROXY_URL } from "../data/rocketProxy.js";

const FallbackMiniScene = React.lazy(() => import("./FallbackMiniScene.jsx"));

function extProps(href) {
  return href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
}

class MiniSceneBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function FallbackPreview() {
  const [miniSceneFailed, setMiniSceneFailed] = useState(false);
  const handleMiniReady = useCallback(() => {}, []);
  const handleMiniError = useCallback(() => {
    setMiniSceneFailed(true);
  }, []);

  return (
    <article className="apollo-poster">
      <div className="apollo-poster-wordmark">KID APOLLO</div>
      <div className="apollo-poster-stage">
        {!miniSceneFailed && (
          <MiniSceneBoundary fallback={null} onError={handleMiniError}>
            <Suspense
              fallback={
                <div className="fallback-mini-scene fallback-mini-loading">
                  <span className="fallback-mini-loading-dot" aria-hidden="true" />
                </div>
              }
            >
              <FallbackMiniScene
                rocketUrl={ROCKET_PROXY_URL}
                onReady={handleMiniReady}
                onError={handleMiniError}
              />
            </Suspense>
          </MiniSceneBoundary>
        )}
        <a className="apollo-poster-listen" href={LINK_TARGETS.listen} {...extProps(LINK_TARGETS.listen)}>
          LISTEN →
        </a>
      </div>
      <ul className="apollo-poster-tracklist">
        <li><a href={LINK_TARGETS.watch} {...extProps(LINK_TARGETS.watch)}>Watch</a></li>
        <li><a href={LINK_TARGETS.instagram} {...extProps(LINK_TARGETS.instagram)}>Instagram</a></li>
        <li><a href={LINK_TARGETS.tiktok} {...extProps(LINK_TARGETS.tiktok)}>TikTok</a></li>
        <li><a href={LINK_TARGETS.signup} {...extProps(LINK_TARGETS.signup)}>Sign up</a></li>
        <li><a href={LINK_TARGETS.vinyl} {...extProps(LINK_TARGETS.vinyl)}>Vinyl</a></li>
        <li className="dim"><span aria-disabled="true">Merch — soon</span></li>
      </ul>
    </article>
  );
}
