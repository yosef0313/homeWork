
export interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  experience: number;
}

export interface FilterState {
  name: string;
  position: string;
  status: string;
  experience: string; 
}


// Pure filtering function (unit-test friendly): applies Name/Position/Status/Experience with AND logic.
export function filterCandidates(candidates: Candidate[], filters: FilterState): Candidate[] {
  const nameQuery = filters.name.trim().toLowerCase();

  const exp = filters.experience.trim() === '' ? null : Number(filters.experience);

  const hasValidExp = exp != null && !Number.isNaN(exp);

  return candidates.filter((candidate) => {
    const matchesName =
      nameQuery === '' || candidate.name.toLowerCase().includes(nameQuery);

    const matchesPosition =
      !filters.position || candidate.position === filters.position;

    const matchesStatus =
      !filters.status || candidate.status === filters.status;

    const matchesExperience =
      !hasValidExp || candidate.experience === (exp as number);

    return matchesName && matchesPosition && matchesStatus && matchesExperience;
  });
}
