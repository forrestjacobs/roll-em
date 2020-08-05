import type { Illustration } from "zdog";
import { render } from "./render";

function makeMockIllustration(): Illustration {
  return {
    translate: {},
    rotate: {},
    updateRenderGraph: jest.fn(),
  } as unknown as Illustration;
}

it("rotates the die", () => {
  const illustration = makeMockIllustration();
  const face = document.createElement("span");

  render(6, illustration, face, 0);
  expect(illustration.rotate.x).toBeCloseTo(2);

  render(6, illustration, face, 0.25);
  expect(illustration.rotate.x).toBeCloseTo(0.84375);

  render(6, illustration, face, 0.5);
  expect(illustration.rotate.x).toBeCloseTo(0.25);

  render(6, illustration, face, 0.75);
  expect(illustration.rotate.x).toBeCloseTo(0.03125);

  render(6, illustration, face, 1);
  expect(illustration.rotate.x).toBeCloseTo(0);
});

it("translate the die", () => {
  const illustration = makeMockIllustration();
  const face = document.createElement("span");

  render(6, illustration, face, 0);
  expect(illustration.translate.y).toBeCloseTo(-44);

  render(6, illustration, face, 0.25);
  expect(illustration.translate.y).toBeCloseTo(-18.5625);

  render(6, illustration, face, 0.5);
  expect(illustration.translate.y).toBeCloseTo(-5.5);

  render(6, illustration, face, 0.75);
  expect(illustration.translate.y).toBeCloseTo(-0.6875);

  render(6, illustration, face, 1);
  expect(illustration.translate.y).toBeCloseTo(0);
});

it("transforms the face", () => {
  const illustration = makeMockIllustration();
  const face = document.createElement("span");

  render(6, illustration, face, 0);
  expect(face.style.transform).toBe("matrix(1, 0, 0, -0.41615, 0, -72.29070)");

  render(6, illustration, face, 0.25);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 0.66467, 0, -41.80807)");

  render(6, illustration, face, 0.5);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 0.96891, 0, -13.19740)");

  render(6, illustration, face, 0.75);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 0.99951, 0, -1.65961)");

  render(6, illustration, face, 1);
  expect(face.style.transform).toBe("matrix(1, 0, 0, 1.00000, 0, 0.00000)");
});
