import { generateSidebar } from "@/lib/sidebar";
import { DashboardHero } from "@/components/Dashboard/Hero";
import { BranchExplorer } from "@/components/Dashboard/BranchExplorer";
import { Shield, Zap, Layers } from "lucide-react";

export default async function Home() {
  const sidebarItems = await generateSidebar();

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <DashboardHero />

      {/* Dynamic Branching Explorer Section */}
      <section className="flex-1 bg-sidebar/30 backdrop-blur-sm border-b border-sidebar-border relative min-h-[700px]">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <div className="px-8 mt-12 mb-4">
            <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-primary">
              <span className="inline-block w-8 h-[1px] bg-primary mr-4 align-middle" />
              Vault_Hierarchical_Expansion
            </h2>
          </div>
          <BranchExplorer initialItems={sidebarItems} />
        </div>
      </section>

      {/* Footer Features */}
      <section className="px-8 py-20 bg-background relative z-10 border-t border-sidebar-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 text-foreground/30 text-[10px] font-mono uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-primary opacity-50" />
            <span>ENCRYPTED_VAULT_SYSTEM</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-primary opacity-50" />
            <span>RAPID_PIPELINE_CRAWLER</span>
          </div>
          <div className="flex items-center gap-3">
            <Layers className="w-4 h-4 text-primary opacity-50" />
            <span>BRANCHING_SCHEMA_V2.5</span>
          </div>
          <div className="ml-auto opacity-20">
            SECURE_VAULT_ACCESS_GRANTED
          </div>
        </div>
      </section>
    </div>
  );
}
