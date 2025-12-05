"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingBasket, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

export type Ingredient = {
  id: string;
  name: string;
  image: string;
  measurement: string;
  nutrition: {
    type: string; // e.g., "Carbohydrate", "Protein", "Fat", "Vitamins", "Fiber", "Minerals"
  };
};

type IngredientsTableProps = {
  ingredients: Ingredient[];
};

export function IngredientsTable({ ingredients }: IngredientsTableProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <section className="font-body w-full rounded-[12px] bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <ShoppingBasket className="size-5 text-foreground" />
          <h3 className="font-semibold text-lg font-heading">Ingredients</h3>
          <span className="text-sm font-medium text-muted-foreground">
            {ingredients.length}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-5 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflowY: "hidden" }}
            className="w-full"
          >
            <div className="pb-5 pt-2 w-full">
              <div className="overflow-x-auto px-5 w-full">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col style={{ width: "50%" }} />
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "20%" }} />
                  </colgroup>
                  <thead>
                    <tr className="border-b border-black/5 dark:border-white/5">
                      <th className="text-left py-3 px-0">
                        <span className="text-sm font-medium text-muted-foreground">
                          Resources
                        </span>
                      </th>
                      <th className="text-left py-3 px-0">
                        <span className="text-sm font-medium text-muted-foreground">
                          Nutrition
                        </span>
                      </th>
                      <th className="text-right py-3 px-0">
                        <span className="text-sm font-medium text-muted-foreground">
                          Measurement
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient) => (
                      <tr
                        key={ingredient.id}
                        className="border-b border-black/5 dark:border-white/5 last:border-b-0"
                      >
                        <td className="py-3 px-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="relative size-10 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                              <Image
                                src={ingredient.image}
                                alt={ingredient.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium text-foreground truncate min-w-0">
                              {ingredient.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-0">
                          <span className="text-sm font-medium text-foreground truncate block">
                            {ingredient.nutrition.type}
                          </span>
                        </td>
                        <td className="py-3 px-0 text-right">
                          <span className="text-sm font-medium text-foreground truncate block">
                            {ingredient.measurement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
