import { FastifyRequest, FastifyReply } from "fastify";
import { 
ionId,
        createdAt: m.createdAt,
        user: {
          id: m.userActualId,
          name: m.userName,
          email: m.userEmail,
        },
      })),
    });
  } catch (error) {
    console.error("Error listing organization members:", error);
    return reply.status(500).send({
      error: "InternalServerError",
      message: "An error occurred while listing organization members",
    });
  }
}
