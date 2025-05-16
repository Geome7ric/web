import { ImageResponse } from "next/og";
import { getProject } from "@/app/data";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Proyecto de Geome7ric";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default function Image({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const project = getProject({ id: params.slug });

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#181819",
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 700,
            paddingTop: 40,
            paddingBottom: 40,
            paddingLeft: 60,
            paddingRight: 60,
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: 30 }}>Geome7ric</div>
          <div style={{ fontSize: 32, fontWeight: 400 }}>
            Soluciones digitales para tu negocio
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#181819",
          color: "#ffffff",
          padding: 60,
          position: "relative",
        }}
      >
        {/* Título del proyecto con fondo semitransparente */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              marginBottom: 20,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#cccccc",
              marginBottom: 40,
              textAlign: "center",
            }}
          >
            {project.description}
          </div>

          {/* Sección de tecnologías */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              padding: "20px 30px",
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 15,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#41c2b9",
                marginRight: 10,
              }}
            >
              Creado por:
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              Geome7ric
            </div>
          </div>
        </div>

        {/* Logo o marca en la esquina */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            color: "#41c2b9",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          Geome7ric
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
