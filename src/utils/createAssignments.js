export function createAssignments(membersId) {

  if (membersId.length < 2) {
    throw new Error("At least two members are required for Secret Santa!");
  }
  
  const givers = [ ...membersId ];
  const receivers = [ ...membersId ];
  
  // Shuffle receivers array to randomize assignments
  for (let i = receivers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ receivers[ i ], receivers[ j ] ] = [ receivers[ j ], receivers[ i ] ];
  }
  
  // Ensure no one is their own Secret Santa
  for (let i = 0; i < givers.length; i++) {
    if (givers[ i ] === receivers[ i ]) {
      // If someone is matched to themselves, swap with another random participant
      const swapIndex = (i + 1) % receivers.length;
      [ receivers[ i ], receivers[ swapIndex ] ] = [ receivers[ swapIndex ], receivers[ i ] ];
    }
  }
  
  // Create pairs
  const pairs = givers.map((giver, index) => ({
    giver,
    receiver: receivers[ index ],
  }));
  
  return pairs;
}