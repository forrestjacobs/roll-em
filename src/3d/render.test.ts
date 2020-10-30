import type { Anchor } from "zdog";
import { render } from "./render";

function makeMockScene(): Anchor {
  return ({
    translate: {},
    rotate: {},
    renderGraphCanvas: jest.fn(),
    updateGraph: jest.fn(),
  } as unknown) as Anchor;
}

function makeMockContext(): CanvasRenderingContext2D {
  return {
    clearRect: jest.fn(),
    save: jest.fn(),
    scale: jest.fn(),
    translate: jest.fn(),
    restore: jest.fn()
  } as unknown as CanvasRenderingContext2D;
}

it("rotates the die", () => {
  const scene = makeMockScene();
  const context = makeMockContext();
  const face = document.createElement("span");

  render(6, scene, 1, context, face, 0);
  expect(scene.rotate.x).toBeCloseTo(2);

  render(6, scene, 1, context, face, 0.25);
  expect(scene.rotate.x).toBeCloseTo(0.84375);

  render(6, scene, 1, context, face, 0.5);
  expect(scene.rotate.x).toBeCloseTo(0.25);

  render(6, scene, 1, context, face, 0.75);
  expect(scene.rotate.x).toBeCloseTo(0.03125);

  render(6, scene, 1, context, face, 1);
  expect(scene.rotate.x).toBeCloseTo(0);
});

it("translate the die", () => {
  const scene = makeMockScene();
  const context = makeMockContext();
  const face = document.createElement("span");

  render(6, scene, 1, context, face, 0);
  expect(scene.translate.y).toBeCloseTo(-44);

  render(6, scene, 1, context, face, 0.25);
  expect(scene.translate.y).toBeCloseTo(-18.5625);

  render(6, scene, 1, context, face, 0.5);
  expect(scene.translate.y).toBeCloseTo(-5.5);

  render(6, scene, 1, context, face, 0.75);
  expect(scene.translate.y).toBeCloseTo(-0.6875);

  render(6, scene, 1, context, face, 1);
  expect(scene.translate.y).toBeCloseTo(0);
});

it("transforms the face", () => {
  const scene = makeMockScene();
  const context = makeMockContext();
  const face = document.createElement("span");

  render(6, scene, 1, context, face, 0);
  expect(face.style.transform).toBe("matrix(1, 0, 0, -0.41615, 0, -72.29070)");

  render(6, scene, 1, context, face, 0.25);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 0.66467, 0, -41.80807)");

  render(6, scene, 1, context, face, 0.5);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 0.96891, 0, -13.19740)");

  render(6, scene, 1, context, face, 0.75);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 0.99951, 0, -1.65961)");

  render(6, scene, 1, context, face, 1);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 1.00000, 0, 0.00000)");
});
