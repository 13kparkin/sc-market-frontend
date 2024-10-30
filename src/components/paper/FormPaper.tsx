import { useTheme } from "@mui/material/styles"
import React from "react"
import { Grid, GridProps, Paper, PaperProps, Typography } from "@mui/material"

export function PaperGrid(props: { GridProps: GridProps } & PaperProps) {
  const { children, GridProps, ...paperProps } = props
  return (
    <Grid item justifyContent={"left"} {...GridProps}>
      <Paper {...paperProps}>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </Paper>
    </Grid>
  )
}

export function FormPaper(props: {
  title: React.ReactNode
  subtitle?: React.ReactNode
  children: React.ReactNode
}) {
  const { title, subtitle, children } = props
  const theme = useTheme()

  return (
    <>
      <Grid item xs={12} lg={3}>
        <Typography
          variant={"h6"}
          align={"left"}
          color={"text.secondary"}
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography variant={"subtitle1"} color={"text.secondary"}>
          {subtitle}
        </Typography>
      </Grid>
      <PaperGrid GridProps={{ xs: 12, lg: 9 }} sx={{ padding: 2 }}>
        <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
          <Grid container spacing={1}>
            {children}
          </Grid>
        </Grid>
      </PaperGrid>
    </>
  )
}
