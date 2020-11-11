function innerRotate(xLikeOffset: number, yLikeOffset: number) {
  return (source: number[], destination: number[], theta: number) => {
    const len = source.length;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    for (let i = 0; i < len; i += 3) {
      const sourceXLike = source[i + xLikeOffset];
      const sourceYLike = source[i + yLikeOffset];
      destination[i + xLikeOffset] =
        sourceXLike * cosTheta - sourceYLike * sinTheta;
      destination[i + yLikeOffset] =
        sourceYLike * cosTheta + sourceXLike * sinTheta;
    }
  };
}

export const rotateZ = innerRotate(0, 1);
export const rotateY = innerRotate(0, 2);
export const rotateX = innerRotate(1, 2);
