
    role: string;
    organizationId: string;
  };
}

export async function addUserToOrganization(
  request: FastifyRequest<AddUserToOrganization>,
  reply: FastifyReply
) {
  try {
    const { email, role, 
    ]);

    return reply.status(201).send({
      message: "User added to organization successfully",
    });
  } catch (error: any) {
    console.error(String(error));
    return reply.status(500).send({ error: String(error) });
  }
}
