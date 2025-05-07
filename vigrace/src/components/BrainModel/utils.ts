
type Link = {
    source: string;
    target: string;
  };
  

export  const links: Link[] = [
    { source: "Nodo Cz", target: "Nodo C2" },
    { source: "Nodo Cz", target: "Nodo C4" },
    { source: "Nodo C2", target: "Nodo P3" },
    { source: "Nodo C3", target: "Nodo P3" },
    { source: "Nodo C3", target: "Nodo Cz" },
    { source: "Nodo C3", target: "Nodo F3" },
    { source: "Nodo Pz", target: "Nodo P4" },
    { source: "Nodo Pz", target: "Nodo P3" },
    { source: "Nodo Pz", target: "Nodo Cz" },
    { source: "Nodo P4", target: "Nodo C4" },
    { source: "Nodo F3", target: "Nodo C2" },
    { source: "Nodo Fz", target: "Nodo Cz" },
    { source: "Nodo F4", target: "Nodo C4" },
    { source: "Nodo F4", target: "Nodo Fz" },
    { source: "Nodo Fz", target: "Nodo F3" },
    { source: "Nodo O1", target: "Nodo P3" },
    { source: "Nodo O2", target: "Nodo P4" },
    { source: "Nodo Fp1", target: "Nodo F3" },
    { source: "Nodo Fp2", target: "Nodo F4" },
    { source: "Nodo T4", target: "Nodo C4" },
    { source: "Nodo T3", target: "Nodo C2" },
    { source: "Nodo T5", target: "Nodo P3" },
    { source: "Nodo T3", target: "Nodo T5" },
    { source: "Nodo T4", target: "Nodo T6" },
    { source: "Nodo T6", target: "Nodo P4" },
    { source: "Nodo F7", target: "Nodo F3" },
    { source: "Nodo F8", target: "Nodo F4" },
    { source: "Nodo F8", target: "Nodo T4" },
    { source: "Nodo F7", target: "Nodo T3" },
  ];


export function getNodePosition(name: string): [number, number, number] {
  switch (name) {
    case "Cz":
      return [0, 2.35, 0];
    case "C2":
      return [0.6, 2.15, 0];
    case "C4":
      return [-0.6, 2.15, 0];
    case "C3":
      return [0.6, 2.1, 0];
    case "P3":
      return [0.5, 2.1, -0.6];
    case "P4":
      return [-0.5, 2.1, -0.6];
    case "Pz":
      return [0, 2.15, -0.7];
    case "F3":
      return [0.5, 2.1, 0.6];
    case "F4":
      return [-0.5, 2.1, 0.6];
    case "Fz":
      return [0, 2.25, 0.6];
    case "O1":
      return [0.35, 1.8, -1];
    case "O2":
      return [-0.35, 1.8, -1];
    case "Fp1":
      return [0.4, 1.9, 1];
    case "Fp2":
      return [-0.4, 1.9, 1];
    case "T3":
      return [1.05, 1.6, 0];
    case "T4":
      return [-1.05, 1.6, 0];
    case "T6":
      return [-1, 1.6, -0.6];
    case "T5":
      return [1, 1.6, -0.6];
    case "F8":
      return [-0.9, 1.55, 0.6];
    case "F7":
      return [0.9, 1.55, 0.6];
    default:
      return [0, 0, 0];
  }
}

export function splitArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}