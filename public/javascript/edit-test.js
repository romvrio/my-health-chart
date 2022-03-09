async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="test-title"]').value;
    const test_content = document.querySelector('input[name="test-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/test/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            title,
            test_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) { 
      document.location.replace('/dashboard/');
    };
}