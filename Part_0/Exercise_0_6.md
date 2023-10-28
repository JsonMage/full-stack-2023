sequenceDiagram
    participant browser
    participant server

    activate browser
    browser->>browser: Redraw notes including the new note
    deactivate browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON response message
    deactivate server

    Note right of browser: The browser sends new note to the server