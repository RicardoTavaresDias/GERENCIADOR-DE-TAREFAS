import request from "supertest"
import { app } from "@/app"
import { PrismaClient } from "@prisma/client"
import { describe } from "node:test"

const prisma = new PrismaClient()
let USERid: string
let TEAMid: string
let TEAMSMEMBERSid: string
let TASKid: string

// LOGIN

describe("LoginController", () => {

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/login").send({
      name: "Test User login",
      email: "test@email.com",
      password: "password123"
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe("Test User login registered successfully!")

    const data = await prisma.users.findFirst({ where: { email: "usertest@email.com" }})
    const { id }: any = data
    USERid = id

  })

  it("should throw an error if user with same email already exists", async () => {
    const response = await request(app).post("/login").send({
      name: "Duplicate User login",
      email: "test@email.com",
      password: "password123"
    })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe("User already registered")
  })

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/login").send({
      name: "Test User login",
      email: "test-email.com",
      password: "password123"
    })

    expect(response.status).toBe(400)
  })
})




// SESSION

describe("SessionController", () => {
  afterAll(async () => {
    const data = await prisma.users.findFirst({ where: { name: "Test User session" }})
    await prisma.users.delete({ where: { id: data?.id }})
  })

  it("Login authentication with token", async () => {
    const Userresponse = await request(app).post("/login").send({
      name: "Test User session",
      email: "testsession@email.com",
      password: "password123"
    })

    const response  = await request(app).post("/session").send({
      email: "testsession@email.com",
      password: "password123"
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.body.role).toBe("member")
    expect(response.body.message).toBe("Session initial!")
  })

  it("Wrong email", async () => {
    const response  = await request(app).post("/session").send({
      email: "testsessio@email.com",
      password: "password123"
    })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("testsessio@email.com not registered, please register")
  })

  it("wrong password", async () => {
    const response  = await request(app).post("/session").send({
      email: "testsession@email.com",
      password: "password12"
    })
    expect(response.status).toBe(405)
    expect(response.body.message).toBe("incorrect username and password")
  })
})





/// TEAMS



describe("TeamsControllerADMIN", async () => { 
  let token: any

  beforeAll(async () => {
    const response  = await request(app).post("/session").send({
      email: "admin@email.com",
      password: "12345678"
    })
    token = response.body.token
    expect(response.status).toBe(200)
  })

  it("List show Teams admin", async() => {
    const response = await request(app)
    .get("/teams")
    .set("Authorization", `Bearer ${token}`)
    .send()

    expect(response.status).toBe(200)
  })

  it("Create teams admin", async() => {
    const response = await request(app)
    .post("/teams")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test name",
      description: "Test description"
    })
    expect(response.status).toBe(201)
    expect(response.body.message).toBe("registered successfully!")
  })

  it("Update teams admin", async() => {
    const returnPrisma = await prisma.teams.findFirst({where: { name: "Test name" }})
    const { id, ...rest }: any = returnPrisma
    TEAMid = id
    const response = await request(app).patch(`/teams/${TEAMid}`).set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test Update"
    })
    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Data updated successfully")
  })
})

describe("TeamsControllerMEMBER", async () => {
  let token: any

  beforeAll(async () => {
    const response  = await request(app).post("/session").send({
      email: "usertest@email.com",
      password: "password123"
    })
    token = response.body.token
    expect(response.status).toBe(200)
  })

  it("List show Teams member", async() => {
    const response = await request(app)
    .get("/teams")
    .set("Authorization", `Bearer ${token}`)
    .send()

    expect(response.status).toBe(401)
    expect(response.body.message).toBe("Unauthorized")
  })

  it("Create teams member", async() => {
    const response = await request(app)
    .post("/teams")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Test name",
      description: "Test description"
    })
    
    expect(response.status).toBe(401)
    expect(response.body.message).toBe("Unauthorized")
  })

  it("Update teams member", async() => {
    const response = await request(app).patch(`/teams/${TEAMid}`).set("Authorization", `Bearer ${token}`)
    .send({
      name: " Test Update"
    })

    expect(response.status).toBe(401)
    expect(response.body.message).toBe("Unauthorized")
  })
})




// TEAM MEMBERS

describe("TeamMembersControllerADMIN", () => {
  let token: any
  
  beforeAll(async () => {
    const response  = await request(app).post("/session").send({
      email: "admin@email.com",
      password: "12345678"
    })
    token = response.body.token
    expect(response.status).toBe(200)
  })

  it("List show Teams Members admin", async() => {
      const response = await request(app)
      .get("/team-members")
      .set("Authorization", `Bearer ${token}`)
      .send()
     
      expect(response.status).toBe(200)
    })

    it("Create teams members", async() => {
      const response = await request(app)
      .post("/team-members")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idUsers: USERid,
        idTeams: TEAMid
      })
      
      const [ data ]: any  = await prisma.teamMembers.findMany({ where: { userid: USERid }})
      TEAMSMEMBERSid = data.id
      expect(response.status).toBe(201)
    })

    
})


describe("TeamMembersControllerMEMBER", () => {
  let token: any
  
  beforeAll(async () => {
    const response  = await request(app).post("/session").send({
      email: "usertest@email.com",
      password: "password123"
    })
    token = response.body.token
    expect(response.status).toBe(200)
  })

  it("List show Teams Members", async() => {
      const response = await request(app)
      .get("/team-members")
      .set("Authorization", `Bearer ${token}`)
      .send()
     
      expect(response.status).toBe(200)
    })

    it("Create teams members", async() => {
      const response = await request(app)
      .post("/team-members")
      .set("Authorization", `Bearer ${token}`)
      .send({
        idUsers: USERid,
        idTeams: TEAMid
      })

      expect(response.status).toBe(401)
      expect(response.body.message).toBe("Unauthorized")
    })

    it("Delete teams members", async() => {
      const response = await request(app)
      .delete(`/team-members/${TEAMSMEMBERSid}`)
      .set("Authorization", `Bearer ${token}`)
      .send()

      expect(response.status).toBe(401)
      expect(response.body.message).toBe("Unauthorized")
    })
})



// TASKS


describe("TasksControllerADMIN", () => {
  let token: any

  beforeAll(async () => {
      const response  = await request(app).post("/session").send({
        email: "admin@email.com",
        password: "12345678"
      })
      token = response.body.token
      expect(response.status).toBe(200)
    })

    it("List show Tasks admin", async() => {
      const response = await request(app).get("/tasks").set("Authorization", `Bearer ${token}`)
      .send()

      expect(response.status).toBe(200)
    })

    it("Create Tasks admin", async() => {
      const response = await request(app).post("/tasks").set("Authorization", `Bearer ${token}`)
      .send({
        title: "TEST TITLE",
        description: "TESTE DESCRIPTION",
        userId: USERid,
        teamId: TEAMid
      })

      expect(response.status).toBe(201)
      expect(response.body.message).toBe("Tasks registered successfully")
    })

    it("Update Tasks admin", async() => {
      const [ data ] = await prisma.tasks.findMany({ where: { title: "TEST TITLE" }})
      TASKid = data.id
      const response = await request(app).patch(`/tasks/${TASKid}`).set("Authorization", `Bearer ${token}`)
      .send({
        status: "in_progress",
        priority: "medium"
      })

      expect(response.status).toBe(200)
    })
})


describe("TasksControllerMEMBER", () => {
  let token: any

  beforeAll(async () => {
      const response  = await request(app).post("/session").send({
        email: "usertest@email.com",
        password: "password123"
      })
      token = response.body.token
      expect(response.status).toBe(200)
    })

    it("List show Tasks member", async() => {
      const response = await request(app).get("/tasks").set("Authorization", `Bearer ${token}`)
      .send()

      expect(response.status).toBe(200)
    })

    it("Create Tasks member", async() => {
      const response = await request(app).post("/tasks").set("Authorization", `Bearer ${token}`)
      .send({
        title: "TEST TITLE",
        description: "TESTE DESCRIPTION",
        userId: USERid,
        teamId: TEAMid
      })

      expect(response.status).toBe(401)
      expect(response.body.message).toBe("Unauthorized")
    })

    it("Update Tasks member", async() => {
      const [ data ] = await prisma.tasks.findMany({ where: { title: "TEST TITLE" }})
      TASKid = data.id
      const response = await request(app).patch(`/tasks/${TASKid}`).set("Authorization", `Bearer ${token}`)
      .send({
        title: "TESTE UPDATE TITLE MEMBER",
        description: "TESTE UPDATE DESCRIPTION MEMBER"
      })

      expect(response.status).toBe(200)
    })

    it("Update Tasks member", async() => {
      const response = await request(app).delete(`/tasks/${TASKid}`).set("Authorization", `Bearer ${token}`)
      .send()

      expect(response.status).toBe(401)
      expect(response.body.message).toBe("Unauthorized")
    })


  // REMOVER DADOS
  describe("REMOVE", () => {
    let token: any

  beforeAll(async () => {
      const response  = await request(app).post("/session").send({
        email: "admin@email.com",
        password: "12345678"
      })
      token = response.body.token
      expect(response.status).toBe(200)
    })

  it("REMOVE MEMBERS", async() => {
      const response = await request(app)
      .delete(`/team-members/${TEAMSMEMBERSid}`)
      .set("Authorization", `Bearer ${token}`)
      .send()

      expect(response.status).toBe(200)
    })

    it("REMOVE TASKS", async() => {
      const response = await request(app).delete(`/tasks/${TASKid}`).set("Authorization", `Bearer ${token}`)
      .send()

      expect(response.status).toBe(200)
      expect(response.body.message).toBe("Task removed successfully")
    })

    it("REMOVE TEAMS", async() => {
        const data = await prisma.teams.findFirst({ where: { name: "Test Update" }})
        await prisma.teams.delete({ where: { id: data?.id }})
    })
    
    it("REMOVE USER", async() => {
        const data = await prisma.users.findFirst({ where: { name: "Test User login" }})
        await prisma.users.delete({ where: { id: data?.id }})
      })
    })
})
