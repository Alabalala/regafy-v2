export async function newFriendRequestMessage(userId, senderName, supabase ) {

  const { error } = await supabase
    .from("messages")
    .insert({
      "user_id": userId,
      subject: "Nueva solicitud de amistad",
      message: `${senderName} te ha enviado una solicitud de amistad.`
    })
  
  if (error) {
    console.log(error)
  }
}

export async function requestAcceptedMessage(userId, friendName, supabase ) {
  const { error } = await supabase
    .from("messages")
    .insert({
      "user_id": userId,
      subject: "Solicitud de amistad aceptada",
      message: `${friendName} ha aceptado tu solicitud de amistad.`
    })
}
  

export async function groupMessage(userId, senderName, groupName, supabase ) {

  const { error } = await supabase
    .from("messages")
    .insert({
      "user_id": userId,
      subject: "Has sido añadido al grupo",
      message: `${senderName} te ha añadido al grupo ${groupName}.`
    })
    
  if (error) {
    console.log(error)
  }
}

export async function newEventMessage(userId, creatorName, groupName, eventName, supabase) {

  const { error } = await supabase
    .from("messages")
    .insert({
      "user_id": userId,
      subject: "Evento nuevo",
      message: `${creatorName} ha añadido un evento, ${eventName}, al grupo ${groupName}.`
    })
      
  if (error) {
    console.log(error)
  }
}

export async function NewSecretFriendMessage(userId, creatorName, groupName, eventName, supabase) {

  const { error } = await supabase
    .from("messages")
    .insert({
      "user_id": userId,
      subject: "¡Amigo invisible nuevo!",
      message: `${creatorName} ha creado un amigo invisible 
        en el evento ${eventName} del grupo ${groupName}.
         ¡Corre a ver quién te ha tocado!`
    })
        
  if (error) {
    console.log(error)
  }
}