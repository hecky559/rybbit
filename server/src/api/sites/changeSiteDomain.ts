im
  try {
    // Check if site exists and user has permission
    const siteResult = await db
      .select()
      .from(sites)
      .where(eq(sites.siteId, siteId));

    return reply.status(200).send({ message: "Domain updated successfully" });
  } catch (err) {
    console.error("Error changing site domain:", err);

    // Check for unique constraint violation
    if (
      String(err).includes(
        'duplicate key value violates unique constraint "sites_domain_unique"'
      )
    ) {
      return reply.status(409).send({ error: "Domain already in use" });
    }

    return reply.status(500).send({ error: String(err) });
  }
}
