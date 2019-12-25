const update = document.querySelector('.update');
update && update.addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch(`/party/${event.target.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: event.target.id,
      title: event.target.parentNode[0].value,
      body: event.target.parentNode[1].value,
      startsAt: event.target.parentNode[2].value,

    })
  });
  window.location = 'http://localhost:3000/party';
});


const deleteEntry = document.querySelector('.delete');
deleteEntry && deleteEntry.addEventListener('click', async (event) => {
  event.preventDefault();
  await fetch(`/party/${event.target.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: event.target.id
    })
  });
  window.location = 'http://localhost:3000/party';
});