chema,
    }
  );
  const getOverviewTool = tool(
    async (input) => {
      try {
        const result = await fetchOverview({ ...input, timezone, site });
        return JSON.stringify(result);
      } catch (error) {
        console.error(error);
        return "Failed to get overview";
      }
    },
    {
      name: getOverviewToolName,
      description: getOverviewToolDescription,
      schema: getOverviewToolSchema,
    }
  );
  const getOverviewBucketedTool = tool(
    async (input) => {
      try {
        const result = await fetchOverviewBucketed({ ...input, timezone, site });
        return JSON.stringify(result);
      } catch (error) {
        console.error(error);
        return "Failed to get overview bucketed";
      }
    },
    {
      name: getOverviewBucketedToolName,
      description: getOverviewBucketedToolDescription,
      schema: getOverviewBucketedToolSchema,
    }
  );
  const getParameterStatsTool = tool(
    async (input) => {
      try {
        const minutes = NaN;
        const result = await fetchSingleCol({ ...input, timezone, site, minutes });
        return JSON.stringify(result);
      } catch (error) {
        console.error(error);
        return "Failed to get parameter stats";
      }
    },
    {
      name: getParameterStatsToolName,
      description: getParameterStatsToolDescription,
      schema: getParameterStatsToolSchema,
    }
  );

  return [getLiveUserCountTool, getOverviewTool, getOverviewBucketedTool, getParameterStatsTool];
}
