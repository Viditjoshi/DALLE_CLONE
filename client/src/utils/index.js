import { surpriseMePrompts } from "../constants";

export function getRendomePrompt(prompt) {
  const randomeIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomeIndex];

  if (randomPrompt === prompt) return getRendomePrompt(prompt);

  return randomPrompt;
}
