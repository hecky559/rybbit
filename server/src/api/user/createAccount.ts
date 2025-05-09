i/ this can also be an array for multiple roles (e.g. ["admin", "sale"])
      },
    });

    return reply.status(201).send({
      message: "Account created successfully",
      user: {
        id: result.user.id,
        email: result.user.email,
      