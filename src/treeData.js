import React from "react";

const maxDepth = 5;

const renderDepthTitle = ({ path }) => `Depth: ${path.length}`;

const treeData = [
  {
    title: "Titulo",
    subtitle: "subtitulo",
    expanded: true,
    children: [
      {
        title: "Filho",
        subtitle: "Definido na matriz  pertencente ao pai  "
      },
      {
        title: " Estrutura aninhada é renderizada virtualmente ",
        subtitle: (
          <span>
            The tree uses&nbsp;
            <a href="https://github.com/bvaughn/react-virtualized">
              react-virtual
            </a>
            &nbsp;e as linhas de relacionamento são mais um truque visual.
          </span>
        )
      }
    ]
  },
  {
    expanded: true,
    title: "Qualquer nó pode ser o pai ou filho de qualquer outro nó",
    children: [
      {
        expanded: true,
        title: "Filhos",
        children: [{ title: "produto" }]
      }
    ]
  },
  {
    title: "Botão (s) podem ser adicionados ao nó",
    subtitle:
      " Informações do nó são passadas ao gerar para que você possa usá-lo no seu manipulador onClick"
  },
  {
    title: "Mostrar filhos de nodo configurando `expandido`",
    subtitle: ({ node }) => `expandir: ${node.expanded ? "true" : "falso"}`,
    children: [
      {
        title: "Bruce",
        subtitle: ({ node }) => `expanded: ${node.expanded ? "true" : "false"}`,
        children: [{ title: "Bruce Jr." }, { title: "Brucette" }]
      }
    ]
  },
  {
    title: "Avançar",
    subtitle: "Configurar,comportamento, etc.",
    children: [
      {
        title: (
          <div>
            <div
              style={{
                backgroundColor: "gray",
                display: "inline-block",
                borderRadius: 10,
                color: "#FFF",
                padding: "0 5px"
              }}
            >
              Any Component
            </div>
            &nbsp;can be used for `title`
          </div>
        )
      },
      {
        expanded: true,
        title: "Limit nesting with `maxDepth`",
        subtitle: `It's set to ${maxDepth} for this example`,
        children: [
          {
            expanded: true,
            title: renderDepthTitle,
            children: [
              {
                expanded: true,
                title: renderDepthTitle,
                children: [
                  { title: renderDepthTitle },
                  {
                    title: ({ path }) =>
                      path.length >= maxDepth
                        ? "This cannot be dragged deeper"
                        : "This can be dragged deeper"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        title: "Disable dragging on a per-node basis with the `canDrag` prop",
        subtitle: "Or set it to false to disable all dragging.",
        noDragging: true
      },
      {
        title: "You cannot give this children",
        subtitle:
          "Dropping is prevented via the `canDrop` API using `nextParent`",
        noChildren: true
      },
      {
        title:
          "When node contents are really long, it will cause a horizontal scrollbar" +
          " to appear. Deeply nested elements will also trigger the scrollbar."
      }
    ]
  }
];

export default treeData;
