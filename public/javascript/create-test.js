async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="test-title"]').value;
    const test_content = document.querySelector('input[name="test-content"]').value;

    const response = await fetch(`/api/tests`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            test_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-test-form').addEventListener('submit', newFormHandler);