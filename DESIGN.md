# Library Management System

1. **List actors** — Who uses the system?
- Member
- Librarian
- Manager

2. **List main actions** — What do they do? 
- Manage users (Add / update / delete)
- Show materials (Add / update / delete)
- Borrow material
- Return material
- Cancel loan
- Reserve unavailable material
- Review material

3. **Find the nouns** — Each important noun often becomes a **collection** 
- User
- Material
- Loan
- Reservation
- Review

4. **Draw relationships** 
- User `Member` (1) -> (M) Loan
- User `Librarian` (1) -> (M) Loan
- Material (1) -> (M) Loan
- User `Member` (1) -> (M) Reservation
- Material (1) -> (M) Reservation
- User `Member` (1) -> (M) Review
- Material (1) -> (M) Review
- Loan (1) -> (0/1) Review

5. **Name fields by role**
- User 
    name, email, phone, password, registeredAt, role: ["member", "librarian" ,"manager"],

    member: address, dateOfBirth, membershipNumber

    librarian: responsibleDepartment

- material 
 title, materialType: ["book", "magazine", "cd", "map"], category, totalCopies, availableCopies, coverImage
    book: { author, publisher, publishedYear, isbn}

    magazine: { issueNumber, month, year}

    cd: {duration,format}

    map: {region,scale}

- loan 
    borrowDate, dueDate, returnDate, status

    fine: {finePerDay, totalFine, fineStatus}

    memberId (REF: User)
    materialId (REF: Material)
    librarianId (REF: User)


- reservation 
    reservationDate, queuePriority, notifyWhenAvailable, autoCancelAfter
    
    status:[active , notified, cancelled, expired]
    memberId (REF: User)
    materialId (REF: Material)

- review 
    rating, comment
    memberId (REF: User)
    materialId (REF: Material)