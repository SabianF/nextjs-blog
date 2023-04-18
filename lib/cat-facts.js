


export async function getCatFactsData() {
  const catFact = await fetch("https://catfact.ninja/fact");
  return catFact.json();
}
